import { useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber, UnsignedTransaction, ethers } from 'ethers';
import { decodeFunctionData } from 'viem';
import { Address, useAccount, useTransaction } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import SkeletonWrap from '@/components/shared/SkeletonWrap';
import useAbi from '@/hooks/useAbi';
import TransactionReplayInput from './TransactionReplayInput';

// valid/handled arg types
type ValidTypes = string | BigNumber | boolean | string[]; // handle more types as needed

// handle a transaction's arguments' types
type Arg = {
  name: string;
  value: ValidTypes;
  type: TxArgType;
};

// all relevent arg types from a contract
export type TxArgType = 'bool' | 'uint' | 'int' | 'address' | 'bytes' | 'string' | 'bytes[]';

type TransferTransaction = {
  to: string;
  value: BigNumber;
};

type ContractCall = {
  functionName: string;
  args: Arg[];
  value: BigNumber;
};

type AbiInput = {
  name: string;
  type: string;
};

type AbiItem = {
  name: string;
  inputs: AbiInput[];
};

type ContractAbi = AbiItem[];

// A type guard to check if decoded is a TransferTransaction
const isTransferTransaction = (decoded: DecodedState | undefined): decoded is TransferTransaction =>
  !!decoded && !('functionName' in decoded);

// A type guard to check if decoded is a ContractCall
const isContractCall = (decoded: DecodedState | undefined): decoded is ContractCall =>
  !!decoded && 'functionName' in decoded;

// handle a transaction's "decoded" state
// decoded to be able to show to the user, allow inputs, then resubmit the transaction
type DecodedState = TransferTransaction | ContractCall;

interface TransactionReplayProps {
  txHash: Address;
}

const TransactionReplay = ({ txHash }: TransactionReplayProps) => {
  const { address: account } = useAccount();
  const explorerUrl = `https://etherscan.io/tx/${txHash}`;

  // handles the state for the decoded tx, as well as any arg or value input changes
  const [decoded, setDecoded] = useState<DecodedState>();

  // get the transaction data
  const { data, isLoading } = useTransaction({ hash: txHash });

  // get the abi
  const { data: abi } = useAbi(data?.to as Address | undefined);

  const getArgsTypes = ({
    abi,
    functionName,
  }: {
    abi: ContractAbi;
    functionName: string;
  }): AbiInput[] => {
    const functionAbi = abi.find((f) => f.name === functionName);
    if (!functionAbi || !functionAbi.inputs) {
      throw new Error(`Function ${functionName} not found in ABI`);
    }
    return functionAbi.inputs;
  };

  // handle arg and native value changes
  const handleArgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setDecoded((d) => {
      if (!d) return;

      // Handle TransferTransaction type
      if ('to' in d) {
        return {
          ...d,
          [name]: name === 'value' ? BigNumber.from(value) : value,
        };
      }

      // Handle ContractCall type
      if ('functionName' in d) {
        const newArgs = d.args.map((arg) => {
          if (arg.name === name) {
            let newValue: string | BigNumber | boolean;

            switch (arg.type) {
              case 'bool':
                newValue = value.toLowerCase() === 'true'; // Or some other conversion logic
                break;
              case 'uint':
              case 'int':
                newValue = BigNumber.from(value);
                break;
              case 'address':
              case 'bytes':
              case 'string':
                newValue = value;
                break;
              default:
                newValue = value; // fallback, consider throwing an error or handling other types
                break;
            }

            return { ...arg, value: newValue };
          }

          return arg;
        });

        return {
          ...d,
          args: newArgs,
          value: name === 'value' ? BigNumber.from(value) : d.value,
        };
      }
    });
  };

  // handle a transfer transaction
  const handleTransferDecode = useCallback(() => {
    if (!account) return console.log('no account');
    setDecoded({
      to: data?.to || account, // fallback to account if no to address; TODO make more kosher
      value: BigNumber.from(data?.value || '0'),
    });
  }, [account, data?.to, data?.value]);

  const mapAbiTypeToTxArgType = (abiType: string): TxArgType => {
    if (abiType.startsWith('uint') || abiType.startsWith('int')) {
      return 'int';
    } else if (abiType === 'address') {
      return 'address';
    } else if (abiType === 'bool') {
      return 'bool';
    } else if (abiType.startsWith('bytes')) {
      return 'bytes';
    } else if (abiType === 'string') {
      return 'string';
    }
    throw new Error(`Unsupported ABI type ${abiType}`);
  };

  // handle a contract call transaction
  const handleContractCallDecode = useCallback(() => {
    if (!abi || !data) return console.log('Missing abi or data');

    const decoded = decodeFunctionData({ abi, data: data.data as Address });
    const functionName = decoded.functionName;
    const types = getArgsTypes({ abi, functionName });

    const args: Arg[] = decoded.args.map((arg, i) => {
      let value: ValidTypes;

      if (!types[i]) {
        throw new Error(`Missing type information for argument at index ${i}`);
      }

      const type = types[i].type;

      // handle the different types coming from the abi/contract
      switch (type) {
        case 'string':
          value = arg as string;
          break;
        case 'bool':
          value = arg as boolean;
          break;
        case 'uint':
        case 'int':
          value = BigNumber.from(arg);
          break;
        case 'address':
          value = arg as string;
          break;
        case 'bytes':
          value = arg as string;
          break;
        case 'bytes[]':
          value = arg as string;
          break;
        default:
          value = arg as string; // just use a string as fallback for now
      }

      return {
        name: types[i]?.name,
        value,
        type: mapAbiTypeToTxArgType(types[i].type),
      };
    });

    setDecoded({
      functionName,
      args,
      value: data.value,
    });
  }, [abi, data]);

  const decodeTransaction = useCallback(() => {
    if (!data?.data) return console.log('no data');
    if (!abi) {
      console.log('no abi; might be a transfer');
      return handleTransferDecode();
    }

    handleContractCallDecode();
  }, [abi, data?.data, handleContractCallDecode, handleTransferDecode]);

  useEffect(() => {
    decodeTransaction();
  }, [decodeTransaction]);

  // handle transfer transaction
  const transferParams = useMemo<UnsignedTransaction | undefined>(() => {
    if (isTransferTransaction(decoded)) {
      return { to: decoded.to, value: decoded.value };
    }
    return undefined;
  }, [decoded]);

  // handle contract call transaction
  const contractCallParams = useMemo<TxBasicParams | undefined>(() => {
    if (isContractCall(decoded)) {
      return {
        abi,
        address: data?.to as Address | undefined,
        functionName: decoded.functionName,
        args: decoded.args.map((arg) =>
          arg.type === 'address' || arg.value.toString().startsWith('0x')
            ? arg.value
            : BigNumber.from(arg.value)
        ),
        value: decoded.value,
      };
    }
    return undefined;
  }, [abi, data?.to, decoded]);

  return (
    <>
      {!data && !isLoading && (
        <div>No data found for this transaction: please try a different transaction</div>
      )}
      {!decoded ? (
        <SkeletonWrap />
      ) : (
        <>
          {isContractCall(decoded) && (
            <>
              <HeaderResponse text={`${decoded.functionName}`} altUrl={explorerUrl} />
              <SingleLineResponse className="flex items-center justify-center p-2">
                <form className="w-full p-2">
                  {decoded.args.map((arg, i) => (
                    <div className="mb-4" key={i}>
                      <label htmlFor={arg.name} className="block font-medium text-gray-400">
                        {arg.name}
                      </label>
                      <TransactionReplayInput
                        name={arg.name}
                        value={arg.value.toString()}
                        type={arg.type}
                        onChange={handleArgChange}
                      />
                    </div>
                  ))}
                </form>
              </SingleLineResponse>
            </>
          )}
          {(isTransferTransaction(decoded) || isContractCall(decoded)) &&
            BigNumber.from(decoded.value)?.gt(ethers.constants.Zero) && (
              <div className="mb-4">
                <label htmlFor={'value'} className="block font-medium text-gray-400">
                  {'value'}
                </label>
                <TransactionReplayInput
                  name={'value'}
                  value={decoded.value.toString()}
                  type={'uint'}
                  onChange={handleArgChange}
                />
              </div>
            )}
          <ActionResponse
            txParams={contractCallParams}
            sendParams={transferParams}
            approvalParams={undefined}
          />
        </>
      )}
    </>
  );
};

export default TransactionReplay;

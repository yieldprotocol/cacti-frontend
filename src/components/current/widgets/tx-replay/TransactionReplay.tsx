import React, { useCallback, useEffect, useState } from 'react';
import { BigNumber, UnsignedTransaction, ethers } from 'ethers';
import { decodeFunctionData } from 'viem';
import { Address, useTransaction } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import SkeletonWrap from '@/components/shared/SkeletonWrap';
import useAbi from '@/hooks/useAbi';
import TransactionReplayInput from './TransactionReplayInput';

interface TransactionReplayProps {
  txHash: Address;
}

const TransactionReplay = ({ txHash }: TransactionReplayProps) => {
  const { data, isLoading } = useTransaction({ hash: txHash });
  const { data: abi } = useAbi(data?.to as Address | undefined);
  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  const explorerUrl = `https://etherscan.io/tx/${txHash}`;

  // State to hold editable fields, stored as strings for simplicity
  const [decoded, setDecoded] = useState<{
    to?: string;
    value: string;
    functionName?: string;
    args?: {
      name: string; // name of the argument
      value: string; // value of the argument
      type: string; // type of the argument
    }[];
  }>();

  // handle decoding the transaction data
  const handleDecode = useCallback(() => {
    if (!data) return console.log('no data');
    if (!abi) {
      console.log('no abi, is possibly a transfer');
      return setDecoded({
        to: data.to,
        value: data.value.toString(),
        functionName: 'transfer',
      });
    }

    const { args, functionName } = decodeFunctionData({ abi, data: data.data as Address });

    // Get the types of the arguments for the function
    const getArgsTypes = ({
      abi,
      functionName,
      argsLength,
    }: {
      abi: any[];
      functionName: string;
      argsLength: number;
    }) => {
      return abi.find((item) => item.name === functionName && item.inputs.length === argsLength)
        ?.inputs as {
        name: string;
        type: string;
      }[];
    };

    const _args = args as string[];
    const types = getArgsTypes({ abi, functionName, argsLength: _args.length });

    setDecoded({
      to: data.to,
      value: data.value.toString(),
      functionName,
      args: _args.map((_, i) => ({
        name: types[i].name,
        value: _args[i],
        type: types[i].type,
      })),
    });
  }, [abi, data]);

  useEffect(() => {
    handleDecode();
  }, [handleDecode]);

  const handleReset = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      handleDecode();
    },
    [handleDecode]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // handle changing the value param
    if (name === 'value') {
      setDecoded((d) => d && { ...d, value });
      return;
    }

    // handle changing the args
    setDecoded((d) => {
      if (!d?.args) return;

      const newArgs = [...d.args];
      const argIndex = newArgs.findIndex((arg) => arg.name === name);
      if (argIndex !== -1) newArgs[argIndex] = { ...newArgs[argIndex], value: value };

      return { ...d, args: newArgs };
    });
  };

  const getSendParams = useCallback((): UnsignedTransaction | undefined => {
    if (!decoded) {
      console.error('Decoded data is missing');
      return;
    }

    // Initialize a transaction object
    let transaction: Partial<UnsignedTransaction> = {
      to: decoded.to,
      value: BigNumber.from(decoded.value),
    };

    // If it's a simple transfer
    if (!decoded.functionName && !decoded.args) {
      transaction.data = '0x';
    } else {
      if (!decoded.functionName || !decoded.args) {
        console.error('Missing function name or args');
        return;
      }
      // For contract interactions
      // First, convert decoded arguments to their proper types
      const convertedArgs =
        decoded.args?.map((arg) => {
          // Conversion logic here, based on the ABI or arg.type
          // For simplicity, let's assume everything's a string
          return arg.value;
        }) || [];

      // Create the function signature
      const functionTypes = decoded.args.map((arg) => arg.type).join(',');
      const functionSignature = `${decoded.functionName}(${functionTypes})`;

      // Create the encoded data field for contract interaction
      const iface = new ethers.utils.Interface(abi);
      try {
        // Encode the function data
        const data = iface.encodeFunctionData(functionSignature, convertedArgs);
        transaction.data = data;
        // Now, you can populate the transaction object and pass it to ActionResponse
      } catch (e) {
        console.error('Error encoding function data', e);
      }
    }

    setSendParams(transaction);
  }, [abi, decoded]);

  useEffect(() => {
    getSendParams();
  }, [getSendParams]);

  return (
    <>
      {!data && !isLoading && <div>no data found for this transaction</div>}
      {!decoded ? (
        <SkeletonWrap />
      ) : (
        <>
          <HeaderResponse text={`${decoded.functionName}`} altUrl={explorerUrl} />
          <SingleLineResponse className="flex items-center justify-center p-2">
            <form className="w-full p-2">
              {decoded?.args?.map((arg, i) => (
                <div className="mb-4" key={i}>
                  <label htmlFor={arg.name} className="block font-medium text-gray-400">
                    {arg.name}
                  </label>
                  <TransactionReplayInput
                    name={arg.name}
                    value={arg.value}
                    onChange={handleInputChange}
                  />
                </div>
              ))}
              {BigNumber.from(decoded.value)?.gt(ethers.constants.Zero) && (
                <div className="mb-4">
                  <label htmlFor={'value'} className="block font-medium text-gray-400">
                    {'value'}
                  </label>
                  <TransactionReplayInput
                    name={'value'}
                    value={decoded.value}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <button className="rounded-md bg-green-primary p-1.5" onClick={handleReset}>
                Reset
              </button>
            </form>
          </SingleLineResponse>
          <ActionResponse txParams={undefined} sendParams={sendParams} approvalParams={undefined} />
        </>
      )}
    </>
  );
};

export default TransactionReplay;

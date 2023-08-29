import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BigNumber, UnsignedTransaction, ethers } from 'ethers';
import { decodeFunctionData } from 'viem';
import { Address, usePrepareContractWrite, usePrepareSendTransaction, useTransaction } from 'wagmi';
import { ActionResponse, HeaderResponse, SingleLineResponse } from '@/components/cactiComponents';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import SkeletonWrap from '@/components/shared/SkeletonWrap';

interface TransactionReplayProps {
  txHash: Address;
}

const Input = ({ name, value, onChange }: { name: string; value: string; onChange: any }) => (
  <input
    name={name}
    className="mt-2 w-full rounded-md border border-gray-700 bg-gray-primary p-2 hover:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
    value={value}
    placeholder={value}
    onChange={onChange}
  />
);

const TransactionReplay = ({ txHash }: TransactionReplayProps) => {
  const explorerUrl = `https://etherscan.io/tx/${txHash}`;

  // handles the state for the original decoded tx, as well as any arg or value input changes
  const [decoded, setDecoded] = useState<{
    functionName: string;
    args: {
      name: string; // name of the argument
      value: string; // value of the argument
      type: string; // type of the argument
    }[];
    value: string;
  }>();

  // decode transaction function with parameters
  // set parameter values to the original transaction
  // set up form from transaction
  const { data, isLoading } = useTransaction({ hash: txHash });

  // get abi from etherscan using tx hash
  const getAbi = async (contractAddress: string | undefined) => {
    const { data } = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
    );
    const parsed = JSON.parse(data.result);
    return parsed;
  };

  // use react query to get abi from etherscan
  const { data: abi, isError: abiError } = useQuery({
    queryKey: ['abi', data?.to],
    queryFn: async () => await getAbi(data?.to),
    refetchOnWindowFocus: false,
  });

  const getArgsTypes = ({ abi, functionName }: { abi: any[]; functionName: string }) =>
    abi.find((f) => f.name === functionName).inputs;

  // handle arg changes
  const handleArgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // handle changing the value param
    if (name === 'value') {
      setDecoded((d) => d && { ...d, value });
      return;
    }

    // handle changing the args
    setDecoded((d) => {
      if (!d) return;

      const newArgs = [...d.args];
      const argIndex = newArgs.findIndex((arg) => arg.name === name);
      if (argIndex !== -1) newArgs[argIndex] = { ...newArgs[argIndex], value: value };

      return { ...d, args: newArgs };
    });
  };

  // handle a transfer transaction
  const handleTransferDecode = useCallback(() => {
    const functionName = 'transfer ETH';
    const args = [
      {
        name: 'to',
        value: data?.to || 'No to address detected',
        type: 'address',
      },
    ];
    setDecoded({
      functionName,
      args,
      value: data?.value.toString() || '0',
    });
  }, [data?.to, data?.value]);

  // handle a contract call transaction
  const handleContractCallDecode = useCallback(() => {
    if (!abi) return console.log('no abi');
    if (!data) return console.log('no data to decode');
    const decoded = decodeFunctionData({ abi, data: data.data as Address });

    const functionName = decoded.functionName;
    const _args = decoded.args as string[];
    const types = getArgsTypes({ abi, functionName });

    // map args to types
    const args = _args.map((_, i) => ({
      name: types[i].name as string,
      value: _args[i],
      type: types[i].type as string,
    }));

    setDecoded({
      functionName,
      args,
      value: data?.value.toString() || '0',
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
  const sendParams = useMemo<UnsignedTransaction | undefined>(
    () =>
      decoded?.functionName === 'transfer ETH'
        ? { to: decoded.args[0].value, value: BigNumber.from(decoded?.value) }
        : undefined,
    [decoded?.functionName, decoded?.args, decoded?.value]
  );

  // handle contract call transaction
  const txParams = useMemo<TxBasicParams | undefined>(
    () =>
      decoded?.functionName !== 'transfer ETH'
        ? {
            abi,
            address: data?.to as Address | undefined,
            functionName: decoded?.functionName,
            args: decoded?.args.map((arg) =>
              arg.type === 'address' ? arg.value : BigNumber.from(arg.value)
            ),
            value: decoded?.value,
          }
        : undefined,
    [abi, data?.to, decoded?.args, decoded?.functionName, decoded?.value]
  );

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
              {decoded.args.map((arg, i) => (
                <div className="mb-4" key={i}>
                  <label htmlFor={arg.name} className="block font-medium text-gray-400">
                    {arg.name}
                  </label>
                  <Input name={arg.name} value={arg.value} onChange={handleArgChange} />
                </div>
              ))}
              {BigNumber.from(decoded.value)?.gt(ethers.constants.Zero) && (
                <div className="mb-4">
                  <label htmlFor={'value'} className="block font-medium text-gray-400">
                    {'value'}
                  </label>
                  <Input name={'value'} value={decoded.value} onChange={handleArgChange} />
                </div>
              )}
            </form>
          </SingleLineResponse>
          <ActionResponse txParams={txParams} sendParams={sendParams} approvalParams={undefined} />
        </>
      )}
    </>
  );
};

export default TransactionReplay;

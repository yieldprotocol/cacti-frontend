import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { BigNumber, ethers } from 'ethers';
import { decodeFunctionData, isAddress, maxUint256 } from 'viem';
import { Address, useTransaction } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  ListResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import SkeletonWrap from '@/components/shared/SkeletonWrap';

interface TransactionReplayProps {
  txHash: Address;
}

const TransactionReplay = ({ txHash }: TransactionReplayProps) => {
  const explorerUrl = `https://etherscan.io/tx/${txHash}`;

  const [decoded, setDecoded] = useState<{
    functionName: string;
    args: {
      name: string; // name of the argument
      value: string | BigNumber; // value of the argument
      displayValue: string; // formatted value based on if the argument is an address or value
    }[];
    value?: { value: BigNumber; displayValue: string };
  }>();

  // decode transaction function with parameters
  // set parameter values to the original transaction
  // set up form from transaction
  const { data } = useTransaction({ hash: txHash });

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

  // check if the argument value is an address or value
  const handleDisplayValue = (value: string | bigint | BigNumber | undefined) => {
    if (!value) return 'could not parse value';
    if (value === maxUint256) return 'maxUint256';
    const _value = value.toString();
    return isAddress(_value) ? _value : _value.replace('n', '');
  };

  // handle a transfer transaction
  const handleTransferDecode = useCallback(() => {
    const functionName = 'transfer ETH';
    const args = [
      {
        name: 'to',
        value: data?.to || 'No to address detected',
        displayValue: handleDisplayValue(data?.to),
      },
      {
        name: 'value',
        value: data?.value || ethers.constants.Zero,
        displayValue: handleDisplayValue(data?.value),
      },
    ];
    setDecoded({
      functionName,
      args,
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
      displayValue: handleDisplayValue(_args[i]),
    }));

    setDecoded({
      functionName,
      args,
      value: { value: data.value, displayValue: data.value.toString() },
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

  return (
    <>
      {!data && <div>no data found for this transaction</div>}
      {!decoded ? (
        <SkeletonWrap />
      ) : (
        <>
          <HeaderResponse text={`${decoded.functionName}`} altUrl={explorerUrl} />
          <ListResponse data={decoded.args.map((a) => [a.name, a.displayValue])} />
          {decoded.value?.value.gt(ethers.constants.Zero) && (
            <SingleLineResponse value={`Value: ${decoded.value.displayValue}`} />
          )}
          <ActionResponse
            txParams={undefined}
            approvalParams={undefined}
            sendParams={{ to: data?.to, data: data?.data, value: data?.value }}
          />
        </>
      )}
    </>
  );
};

export default TransactionReplay;

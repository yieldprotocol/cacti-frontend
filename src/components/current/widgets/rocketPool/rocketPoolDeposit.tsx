import { useMemo } from 'react';
import { parseEther } from 'viem';
import { UsePrepareContractWriteConfig } from 'wagmi';
import rETHAbi from '@/abi/rETH';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';

interface RethProps {
  inputString: string;
}

const RethDeposit = ({ inputString }: RethProps) => {
  const { data: tokenIn } = useToken('ETH');

  const inputCleaned = useMemo(
    () => cleanValue(inputString.toString(), tokenIn?.decimals),
    [inputString, tokenIn?.decimals]
  );

  const tx: UsePrepareContractWriteConfig = useMemo(
    () => ({
      address: '0xDD3f50F8A6CafbE9b31a427582963f465E745AF8',
      abi: rETHAbi,
      functionName: 'deposit',
      args: [],
      value: parseEther(inputCleaned!),
    }),
    [inputCleaned]
  );

  return (
    <>
      <HeaderResponse text="Deposit ETH into Rocket Pool for rETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="ETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="rETH" />
      </ResponseRow>
      <ActionResponse
        label={`Deposit ${inputCleaned || ''} ${tokenIn?.symbol || ''} into Rocket Pool`}
        approvalParams={undefined}
        txParams={tx}
      />
    </>
  );
};

export default RethDeposit;

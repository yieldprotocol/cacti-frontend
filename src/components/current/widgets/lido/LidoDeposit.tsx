import { useMemo } from 'react';
import { parseEther } from 'viem';
import { Address, UsePrepareContractWriteConfig } from 'wagmi';
import stethAbi from '@/abi/steth';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';

interface LidoProps {
  inputString: string;
}

const LidoDeposit = ({ inputString }: LidoProps) => {
  const { data: tokenIn } = useToken('ETH');
  const { data: tokenOut } = useToken('STETH');

  const inputCleaned = useMemo(
    () => cleanValue(inputString.toString(), tokenIn?.decimals),
    [inputString, tokenIn?.decimals]
  );

  const tx: UsePrepareContractWriteConfig = useMemo(
    () => ({
      address: tokenOut?.address as Address | undefined,
      abi: stethAbi,
      functionName: 'submit',
      args: ['0x0000000000000000000000000000000000000000'],
      value: parseEther(inputCleaned!),
    }),
    [inputCleaned, tokenOut?.address]
  );

  return (
    <>
      <HeaderResponse text="Deposit ETH into Lido for stETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="ETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="stETH" />
      </ResponseRow>
      <ActionResponse
        label={`Deposit ${inputCleaned || ''} ${tokenIn?.symbol || ''} into Lido`}
        approvalParams={undefined}
        txParams={tx}
      />
    </>
  );
};

export default LidoDeposit;

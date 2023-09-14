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

const LidoWithdraw = ({ inputString }: LidoProps) => {
  const { data: tokenIn } = useToken('STETH');
  const { data: tokenOut } = useToken('ETH');

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
      <HeaderResponse text="Withdraw stETH from Lido for ETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="STETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="ETH" />
      </ResponseRow>
      <ActionResponse
        label={`Withdraw ${inputCleaned || ''} ${tokenIn?.symbol || ''} from Lido`}
        approvalParams={undefined}
        txParams={tx}
      />
    </>
  );
};

export default LidoWithdraw;

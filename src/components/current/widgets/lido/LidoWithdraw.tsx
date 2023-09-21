import { useMemo } from 'react';
import { parseEther, zeroAddress } from 'viem';
import { Address, UsePrepareContractWriteConfig } from 'wagmi';
import stethAbi from '@/abi/steth';
import {
  ActionResponse,
  ErrorResponse,
  HeaderResponse,
  IconResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';

interface LidoProps {
  inputString: string;
}

const LidoWithdraw = ({ inputString }: LidoProps) => {
  const { data: tokenIn } = useToken('STETH');
  const input = useInput(inputString, tokenIn?.symbol!);

  const tx = useMemo<UsePrepareContractWriteConfig>(
    () => ({
      address: tokenIn?.address,
      abi: stethAbi,
      functionName: 'submit', // TODO figure out withdraw function
      args: [zeroAddress],
      value: input?.value,
    }),
    [input?.value, tokenIn?.address]
  );

  return (
    <>
      <HeaderResponse text="Withdraw stETH from Lido for ETH" />
      {!input && <ErrorResponse text="Invalid input" error="Invalid input" />}
      <ResponseRow>
        <SingleLineResponse tokenSymbol="STETH" value={input?.formatted} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="ETH" />
      </ResponseRow>
      <ActionResponse
        label={`Withdraw ${input?.formatted || ''} ${tokenIn?.symbol || ''} from Lido`}
        approvalParams={undefined}
        txParams={tx}
      />
    </>
  );
};

export default LidoWithdraw;

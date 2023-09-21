import { useMemo } from 'react';
import { zeroAddress } from 'viem';
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

interface LidoProps {
  inputString: number;
}

const LidoDeposit = ({ inputString }: LidoProps) => {
  const { data: tokenIn } = useToken('ETH');
  const { data: tokenOut } = useToken('STETH');
  const input = useInput(inputString.toString(), tokenIn?.symbol!);

  const tx = useMemo<UsePrepareContractWriteConfig>(
    () => ({
      address: tokenOut?.address as Address | undefined,
      abi: stethAbi,
      functionName: 'submit',
      args: [zeroAddress],
      value: input?.value,
    }),
    [input?.value, tokenOut?.address]
  );

  return (
    <>
      <HeaderResponse text="Deposit ETH into Lido for stETH" />
      {!input && <ErrorResponse text="Invalid input" error="Invalid input" />}
      <ResponseRow>
        <SingleLineResponse tokenSymbol="ETH" value={input?.formatted} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="stETH" />
      </ResponseRow>
      <ActionResponse
        label={`Deposit ${input?.formatted || ''} ${tokenIn?.symbol || ''} into Lido`}
        approvalParams={undefined}
        txParams={tx}
      />
    </>
  );
};

export default LidoDeposit;

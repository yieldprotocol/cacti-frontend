import { useMemo } from 'react';
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

interface RethProps {
  inputString: string;
}

const RethWithdraw = ({ inputString }: RethProps) => {
  const { data: tokenIn } = useToken('RETH');
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
    }),
    [tokenOut?.address]
  );

  return (
    <>
      <HeaderResponse text="Withdraw rETH from Rocket Pool for ETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="rETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="ETH" />
      </ResponseRow>
      <ActionResponse
        label={`Withdraw ${inputCleaned || ''} ${tokenIn?.symbol || ''} from Rocket Pool`}
        approvalParams={undefined}
        txParams={tx}
      />
    </>
  );
};

export default RethWithdraw;

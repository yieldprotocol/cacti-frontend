import { useMemo } from 'react';
import { Address, UsePrepareContractWriteConfig } from 'wagmi';
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

const RethWithdraw = ({ inputString }: RethProps) => {
  const { data: tokenIn } = useToken('RETH');
  const { data: tokenOut } = useToken('ETH');

  const inputCleaned = useMemo(
    () => cleanValue(inputString.toString(), tokenIn?.decimals),
    [inputString, tokenIn?.decimals]
  );

  const tx: UsePrepareContractWriteConfig = useMemo(
    () => ({
      address: '0xDD3f50F8A6CafbE9b31a427582963f465E745AF8',
      abi: rETHAbi,
      functionName: 'burn',
      args: [],
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

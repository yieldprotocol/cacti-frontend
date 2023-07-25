import { useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils.js';
import rETHAbi from '@/abi/rETH.json';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
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
  const value = useMemo(() => {
    return parseUnits(inputCleaned!, tokenIn?.decimals);
  }, [inputCleaned, tokenIn?.decimals]);

  const tx: TxBasicParams = useMemo(
    () => ({
      address: '0xDD3f50F8A6CafbE9b31a427582963f465E745AF8',
      abi: rETHAbi,
      functionName: 'deposit',
      args: [],
      overrides: {
        value,
      },
    }),
    [value]
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

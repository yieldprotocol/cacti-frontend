import { useMemo } from 'react';
import { parseUnits } from 'ethers/lib/utils.js';
import { Address } from 'wagmi';
import stethAbi from '@/abi/steth.json';
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

interface LidoProps {
  inputString: string;
}

const LidoWithdraw = ({ inputString }: LidoProps) => {
  const { data: tokenIn } = useToken('STETH');
  console.log('🦄 ~ file: LidoWithdraw.tsx:22 ~ LidoWithdraw ~ tokenIn:', tokenIn);
  const { data: tokenOut } = useToken('ETH');

  const inputCleaned = useMemo(
    () => cleanValue(inputString.toString(), tokenIn?.decimals),
    [inputString, tokenIn?.decimals]
  );
  const value = useMemo(() => {
    return parseUnits(inputCleaned!, tokenIn?.decimals);
  }, [inputCleaned, tokenIn?.decimals]);

  const tx: TxBasicParams = useMemo(
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

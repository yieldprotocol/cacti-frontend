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

interface RethProps {
  inputString: string;
}

const RethWithdraw = ({ inputString }: RethProps) => {
  const { data: tokenIn, isETH: tokenInIsETH } = useToken('RETH');
  const { data: tokenOut } = useToken('ETH');

  const inputCleaned = cleanValue(inputString.toString(), tokenIn?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenIn?.decimals);

  const tx: TxBasicParams = {
    address: tokenOut?.address as Address | undefined,
    abi: stethAbi,
    functionName: 'submit',
    args: ['0x0000000000000000000000000000000000000000'],
  };

  return (
    <>
      <HeaderResponse text="Withdraw rETH from Rocket Pool for ETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="rETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="ETH" value={inputCleaned} />
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

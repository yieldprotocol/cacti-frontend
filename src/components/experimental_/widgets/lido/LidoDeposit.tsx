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

const LidoDeposit = ({ inputString }: LidoProps) => {
  const { data: tokenIn, isETH: tokenInIsETH } = useToken('ETH');
  const { data: tokenOut } = useToken('STETH');

  const inputCleaned = cleanValue(inputString.toString(), tokenIn?.decimals);
  const value = parseUnits(inputCleaned!, tokenIn?.decimals);

  const tx: TxBasicParams = {
    address: tokenOut?.address as Address | undefined,
    abi: stethAbi,
    functionName: 'submit',
    args: ['0x0000000000000000000000000000000000000000'],
    overrides: {
      value,
    },
  };

  return (
    <>
      <HeaderResponse text="Deposit ETH into Lido for stETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="ETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="stETH" value={inputCleaned} />
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

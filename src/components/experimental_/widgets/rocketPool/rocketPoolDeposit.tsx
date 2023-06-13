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
  const { data: tokenIn, isETH: tokenInIsETH } = useToken('ETH');

  const inputCleaned = cleanValue(inputString.toString(), tokenIn?.decimals);
  const value = parseUnits(inputCleaned!, tokenIn?.decimals);

  const tx: TxBasicParams = {
    address: '0xDD3f50F8A6CafbE9b31a427582963f465E745AF8',
    abi: rETHAbi,
    functionName: 'deposit',
    args: [],
    overrides: {
      value,
    },
  };

  return (
    <>
      <HeaderResponse text="Deposit ETH into Rocket Pool for rETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="ETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="rETH" value={inputCleaned} />
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

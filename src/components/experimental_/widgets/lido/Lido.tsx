import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import stethAbi from '@/abi/steth.json';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';

interface LidoProps {
  inputAmount: BigNumber;
  
}

const Lido = ({ inputAmount }: LidoProps) => {
  const tokenInSymbol = 'ETH';
  const tokenOutSymbol = 'stETH';

  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { data: tokenInChecked } = useToken('ETH');

  const inputCleaned = cleanValue(inputAmount.toString(), tokenInChecked?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenInChecked?.decimals);
  console.log("amountIn: ", amountIn)
  const tx = {
    address: useToken(tokenOutSymbol).data?.address as `0x${string}`,
    abi: stethAbi,
    functionName: 'submit',
    args: ['0x0000000000000000000000000000000000000000'],
    overrides: {
      value: tokenInIsETH ? inputAmount : 0,
    },
  };

  return (
    <>
      <HeaderResponse text="Deposit ETH in Lido" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="ETH" amount={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="stETH" amount={inputCleaned} />
      </ResponseRow>
      <ActionResponse
        label={`Deposit ${inputCleaned || ''} ${tokenInSymbol || ''} on Lido`}
        txParams={tx}
        // stepper
        // disabled={true}
      />
    </>
  );
};

export default Lido;

import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { useAccount } from 'wagmi';
import rETHAbi from '@/abi/rETH.json';
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

interface RethProps {
  inputAmount: BigNumber;
}

const Reth = ({ inputAmount }: RethProps) => {
  const tokenInSymbol = 'ETH';
  const tokenOutSymbol = 'rETH';

  const chainId = useChainId();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { data: tokenInChecked } = useToken('ETH');

  const inputCleaned = cleanValue(inputAmount.toString(), tokenInChecked?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenInChecked?.decimals);
  //   console.log('amountIn', amountIn)
  //   console.log('useAccount().address', useAccount().address)
  //   console.log(inputCleaned)
  const tx = {
    address: '0xDD3f50F8A6CafbE9b31a427582963f465E745AF8' as `0x${string}`,
    abi: rETHAbi,
    functionName: 'deposit',
    args: [],
    overrides: {
      value: tokenInIsETH ? inputAmount : 0,
    },
  };

  return (
    <>
      <HeaderResponse text="Deposit ETH in rETH" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol="ETH" value={inputCleaned} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol="rETH" value={inputCleaned} />
      </ResponseRow>
      <ActionResponse
        label={`Deposit ${inputCleaned || ''} ${tokenInSymbol || ''} on Reth`}
        txParams={tx}
        // stepper
        // disabled={true}
      />
    </>
  );
};

export default Reth;

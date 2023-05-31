import { parseUnits } from 'ethers/lib/utils.js';
import Swap from '@/components/widgets/swap/Swap';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface SwapWidgetProps {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  buyOrSell: string;
  amountInStrRaw: string;
}

export const SwapWidget = ({
  tokenInSymbol,
  tokenOutSymbol,
  buyOrSell,
  amountInStrRaw,
}: SwapWidgetProps) => {
  const { getToken } = useToken();

  const tokenIn = getToken(tokenInSymbol);
  const amountIn = parseUnits(cleanValue(amountInStrRaw, tokenIn?.decimals)!, tokenIn?.decimals);

  return (
    <ConnectFirst>
      <Swap
        {...{
          tokenInSymbol,
          tokenOutSymbol,
          amountIn,
        }}
      />
    </ConnectFirst>
  );
};

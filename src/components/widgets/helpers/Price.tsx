// 1. Open action panel
// 2. Get token based on symbol
// 3. Fetch from uniswap the price
//   based on the returned token
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { Spinner, findTokenBySymbol } from '@/utils';

type PriceProps = {
  baseToken: string;
  queryToken: string;
};

export const Price = (props: PriceProps) => {
  // Hook to quote price
  // assume fee of 3000
  const { data, error } = useUniswapQuote({
    baseTokenSymbol: props.baseToken,
    quoteTokenSymbol: props.queryToken,
  });
  let widgetComponent = <Spinner className="text-black" />;
  if (data?.humanReadableAmount) {
    widgetComponent = (
      <p className="text-black">{`1 ${props.baseToken} is worth ${data.humanReadableAmount} ${props.queryToken}`}</p>
    );
  } else if (error) {
    console.error(error);
    widgetComponent = (
      <p className="text-black">An error occurred, most likely we don&apos;t support the token</p>
    );
  }

  return <>{widgetComponent}</>;
};

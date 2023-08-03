//   based on the returned token
import { Spinner } from '@/utils';
import useUniswapQuote from '../experimental_/widgets/uniswap/useUniswapQuote';

type PriceProps = {
  baseToken: string;
  queryToken: string;
};

export const Price = (props: PriceProps) => {
  const { data, error } = useUniswapQuote({
    baseTokenSymbol: props.baseToken,
    quoteTokenSymbol: props.queryToken,
  });

  let widgetComponent = <Spinner className="h-4" />;

  if (data?.humanReadableAmount) {
    widgetComponent = (
      <p className="text-sm">{`1 ${props.baseToken} is worth ${data.humanReadableAmount} ${props.queryToken}`}</p>
    );
  } else if (error) {
    console.error(error);
    widgetComponent = <p>An error occurred, most likely we don&apos;t support the token</p>;
  }

  return <>{widgetComponent}</>;
};

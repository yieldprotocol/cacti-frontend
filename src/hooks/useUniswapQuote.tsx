import { CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core';
import { AlphaRouter } from '@uniswap/smart-order-router';
import { ethers } from 'ethers';
import useSWR from 'swr';
import { useProvider } from 'wagmi';
import useChainId from '@/hooks/useChainId';
import { cleanValue, findTokenBySymbol } from '@/utils';

const useUniswapQuote = (props: {
  baseTokenSymbol: string;
  quoteTokenSymbol: string;
  amount?: string;
}) => {
  const chainId = useChainId();
  const provider = useProvider();

  const { isLoading, error, data } = useSWR(
    `useUniswapQuote-${props.baseTokenSymbol}-${props.quoteTokenSymbol}-${chainId}`,
    async () => {
      const isQueryTokenEth = props.quoteTokenSymbol === 'ETH';
      const isBaseTokenEth = props.baseTokenSymbol === 'ETH';
      const tokenIn = isBaseTokenEth
        ? findTokenBySymbol('WETH', chainId)
        : findTokenBySymbol(props.baseTokenSymbol, chainId);
      const tokenOut = isQueryTokenEth
        ? findTokenBySymbol('WETH', chainId)
        : findTokenBySymbol(props.quoteTokenSymbol, chainId);
      const router = new AlphaRouter({
        chainId,
        provider,
      });

      if (!tokenIn) throw new Error(`Token ${props.baseTokenSymbol} not found`);
      if (!tokenOut) throw new Error(`Token ${props.quoteTokenSymbol} not found`);

      const amountToUse = cleanValue(props.amount, tokenIn?.decimals);

      const route = await router.route(
        CurrencyAmount.fromRawAmount(
          new Token(chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol, tokenIn.name),

          ethers.utils.parseUnits(amountToUse || '1', tokenIn.decimals).toString()
        ),
        new Token(chainId, tokenOut.address, tokenOut.decimals, tokenOut.symbol, tokenOut.name),
        TradeType.EXACT_INPUT
      );

      return {
        humanReadableAmount: route?.quote.toFixed(4),
        value: route?.quote,
      };
    },
    {
      revalidateOnFocus: false,
    }
  );
  return { isLoading, error, data };
};

export default useUniswapQuote;

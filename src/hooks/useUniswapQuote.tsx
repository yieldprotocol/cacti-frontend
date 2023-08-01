import { useContext } from 'react';
import { CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core';
import { AlphaRouter } from '@uniswap/smart-order-router';
import { ethers } from 'ethers';
import useSWR from 'swr';
import { useProvider } from 'wagmi';
import SettingsContext from '@/contexts/SettingsContext';
import useChainId from '@/hooks/useChainId';
import { cleanValue, findTokenBySymbol } from '@/utils';

const useUniswapQuote = (props: {
  baseTokenSymbol: string;
  quoteTokenSymbol: string;
  amount?: string | Promise<string>;
}) => {
  const chainId = useChainId();
  const provider = useProvider();

  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

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

      if (!tokenIn) {
        console.error(`Token ${props.baseTokenSymbol} not found`);
        return;
      }
      if (!tokenOut) {
        console.error(`Token ${props.quoteTokenSymbol} not found`);
        return;
      }

      /* If the token are the same, simply return 1:1 as the rate ( without going through the actual fetching process via router ) */
      if (experimentalUi && tokenIn.symbol === tokenOut.symbol)
        return {
          humanReadableAmount: '1.0000',
          value: CurrencyAmount.fromRawAmount(
            new Token(chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol, tokenIn.name),
            ethers.utils.parseUnits('1', tokenIn.decimals).toString()
          ),
        };

      /* If the amount is passed in as a promise we wait for the amount to be resolved before we calculate the quote */
      const amount = await props.amount;
      const amountToQuote = cleanValue(amount, tokenIn.decimals) || '1';

      const route = await router.route(
        CurrencyAmount.fromRawAmount(
          new Token(chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol, tokenIn.name),
          ethers.utils.parseUnits(amountToQuote, tokenIn.decimals).toString()
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

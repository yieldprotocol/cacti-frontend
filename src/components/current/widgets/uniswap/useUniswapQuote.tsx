//@ts-nocheck
import { useContext } from 'react';
import { useQuery } from 'react-query';
import { Token, TradeType } from '@uniswap/sdk-core';
import { AlphaRouter, CurrencyAmount } from '@uniswap/smart-order-router';
import { useProvider } from 'wagmi';
import SettingsContext from '@/contexts/SettingsContext';
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';

interface UseUniswapQuoteProps {
  baseTokenSymbol: string;
  quoteTokenSymbol: string;
  amount?: string; // formatted/human readable input; if none defaults to 1 unit of base token
}

interface UseUniswapQuoteRes {
  humanReadableAmount: string;
  value: CurrencyAmount;
}

const useUniswapQuote = ({ baseTokenSymbol, quoteTokenSymbol, amount }: UseUniswapQuoteProps) => {
  const chainId = useChainId();
  const provider = useProvider();
  const { isETH: baseTokenIsEth } = useToken(baseTokenSymbol);
  const { isETH: quoteTokenIsEth } = useToken(quoteTokenSymbol);
  const { data: baseTokenToUse } = useToken(baseTokenIsEth ? 'WETH' : baseTokenSymbol);
  const { data: quoteTokenToUse } = useToken(quoteTokenIsEth ? 'WETH' : quoteTokenSymbol);
  const oneInput = useInput('1', baseTokenToUse?.symbol!);
  const input = useInput(amount || '1', baseTokenToUse?.symbol!);

  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

  const router = new AlphaRouter({
    chainId,
    provider,
  });

  const getQuote = async (): Promise<UseUniswapQuoteRes | undefined> => {
    const tokenIn = baseTokenToUse;
    const tokenOut = quoteTokenToUse;

    if (!tokenIn) {
      console.error(`Token ${baseTokenSymbol} not found`);
      return;
    }
    if (!tokenOut) {
      console.error(`Token ${quoteTokenSymbol} not found`);
      return;
    }
    if (!input || !input.value) {
      console.error(`Amount not able to be parsed for swapping`);
      return;
    }

    if (!oneInput || !oneInput.value) {
      console.error(`Amount not able to be parsed for swapping`);
      return;
    }

    /* If the token are the same, simply return 1:1 as the rate (without going through the actual fetching process via router) */
    if (experimentalUi && tokenIn.symbol === tokenOut.symbol)
      return {
        humanReadableAmount: '1.0000',
        value: CurrencyAmount.fromRawAmount(
          new Token(chainId, tokenIn.address, tokenIn.decimals, tokenIn.symbol, tokenIn.name),
          oneInput.value.toString()
        ),
      };

    const routerTokenIn = new Token(
      chainId,
      tokenIn.address,
      tokenIn.decimals,
      tokenIn.symbol,
      tokenIn.name
    );
    const routerTokenOut = new Token(
      chainId,
      tokenOut.address,
      tokenOut.decimals,
      tokenOut.symbol,
      tokenOut.name
    );

    const route = await router.route(
      CurrencyAmount.fromRawAmount(routerTokenIn, input.value.toString()),
      routerTokenOut,
      TradeType.EXACT_INPUT
    );

    if (!route) {
      console.error(`Route not found for ${baseTokenSymbol} -> ${quoteTokenSymbol}`);
      return;
    }

    return {
      humanReadableAmount: route.quote.toFixed(4),
      value: route.quote,
    };
  };

  const { data, ...rest } = useQuery({
    queryKey: ['useUniswapQuote', baseTokenSymbol, quoteTokenSymbol, amount, chainId],
    queryFn: getQuote,
    refetchOnWindowFocus: false,
  });

  return { data, ...rest };
};

export default useUniswapQuote;

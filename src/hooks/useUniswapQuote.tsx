import { CurrencyAmount, Token, TradeType } from '@uniswap/sdk-core';
import { AlphaRouter } from '@uniswap/smart-order-router';
import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { BigNumber, ethers } from 'ethers';
import useSWR from 'swr';
import { erc20ABI, useAccount, useContract, useNetwork, useProvider } from 'wagmi';
import { findTokenBySymbol } from '@/utils';
import { MAINNET_CHAIN_ID } from '@/utils/constants';

const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

const useUniswapQuote = (props: { baseTokenSymbol: string; quoteTokenSymbol: string }) => {
  const { chain } = useNetwork();
  const provider = useProvider();
  const CHAIN_ID_FORK_FALLBACK = chain?.id || 36963;

  const { isLoading, error, data } = useSWR(
    `useUniswapQuote-${props.baseTokenSymbol}-${props.quoteTokenSymbol}-${chain?.id || '1'}`,
    async () => {
      const isQueryTokenEth = props.quoteTokenSymbol === 'ETH';
      const isBaseTokenEth = props.baseTokenSymbol === 'ETH';
      const tokenIn = isBaseTokenEth
        ? findTokenBySymbol('WETH', CHAIN_ID_FORK_FALLBACK)
        : findTokenBySymbol(props.baseTokenSymbol, CHAIN_ID_FORK_FALLBACK);
      const tokenOut = isQueryTokenEth
        ? findTokenBySymbol('WETH', CHAIN_ID_FORK_FALLBACK)
        : findTokenBySymbol(props.quoteTokenSymbol, CHAIN_ID_FORK_FALLBACK);
      const router = new AlphaRouter({
        chainId: MAINNET_CHAIN_ID,
        provider: provider,
      });
      const route = await router.route(
        CurrencyAmount.fromRawAmount(
          new Token(
            MAINNET_CHAIN_ID,
            tokenIn.address,
            tokenIn.decimals,
            tokenIn.symbol,
            tokenIn.name
          ),

          ethers.utils.parseUnits('1', tokenIn.decimals).toString()
        ),
        new Token(
          MAINNET_CHAIN_ID,
          tokenOut.address,
          tokenOut.decimals,
          tokenOut.symbol,
          tokenOut.name
        ),
        TradeType.EXACT_INPUT
      );

      return {
        humanReadableAmount: route.quote.toFixed(4),
      };
    }
  );
  return { isLoading, error, data };
};

export default useUniswapQuote;

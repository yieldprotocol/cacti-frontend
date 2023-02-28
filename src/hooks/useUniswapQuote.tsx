import Quoter from '@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json';
import { BigNumber, ethers } from 'ethers';
import useSWR from 'swr';
import { useProvider } from 'wagmi';
import { erc20ABI, useAccount, useContract, useNetwork } from 'wagmi';
import { findTokenBySymbol } from '@/utils';

const QUOTER_CONTRACT_ADDRESS = '0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6';

const useUniswapQuote = (props: { baseTokenSymbol: string; quoteTokenSymbol: string }) => {
  const { chain } = useNetwork();
  const provider = useProvider();

  const { isLoading, error, data } = useSWR(
    `useUniswapQuote-${props.baseTokenSymbol}-${props.quoteTokenSymbol}-${chain.id}`,
    async () => {
      const isQueryTokenEth = props.quoteTokenSymbol === 'ETH';
      const isBaseTokenEth = props.baseTokenSymbol === 'ETH';
      const tokenIn = isBaseTokenEth
        ? findTokenBySymbol('WETH', chain.id)
        : findTokenBySymbol(props.baseTokenSymbol, chain.id);
      const tokenOut = isQueryTokenEth
        ? findTokenBySymbol('WETH', chain.id)
        : findTokenBySymbol(props.quoteTokenSymbol, chain.id);

      const contract = new ethers.Contract(QUOTER_CONTRACT_ADDRESS, Quoter.abi, provider);
      const quotedAmountOut = await contract.callStatic.quoteExactInput(
        tokenIn.address,
        tokenOut.address,
        BigNumber.from(3000),
        ethers.utils.parseUnits('1', tokenIn.decimals).toString(),
        0
      );
      return {
        rawAmount: quotedAmountOut,
        humanReadableAmount: ethers.utils.formatUnits(
          quotedAmountOut.toString(),
          tokenOut.decimals
        ),
      };
    }
  );
  return { isLoading, error, data };
};

export default useUniswapQuote;

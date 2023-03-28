import { BigNumber } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { useAccount, useContract, useContractWrite, usePrepareContractWrite } from 'wagmi';
import SwapRouter02Abi from '@/abi/SwapRouter02.json';
import useFork from '@/hooks/useFork';
import useToken from '@/hooks/useToken';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import useSigner from './useSigner';

interface ExactInputSingleParams {
  tokenIn: string;
  tokenOut: string;
  fee: BigNumber;
  recipient: string;
  deadline: BigNumber;
  amountIn: BigNumber;
  amountOutMinimum: BigNumber;
  sqrtPriceLimitX96: BigNumber;
}

export const UNISWAP_ROUTER_02_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';

const useSwap = (tokenInSymbol: string, tokenOutSymbol: string, amountIn: BigNumber) => {
  const { address: receiver } = useAccount();
  const { useForkEnv } = useFork();
  const { data: tokenIn, isETH: tokenInisETH } = useToken(tokenInSymbol);
  const { data: tokenInForPrice } = useToken(tokenInisETH ? 'WETH' : tokenInSymbol);
  const { data: tokenOut, isETH: tokenOutisETH } = useToken(tokenOutSymbol);
  const { data: tokenOutForPrice } = useToken(tokenOutisETH ? 'WETH' : tokenInSymbol);
  const signer = useSigner();

  const amountInFmt = formatUnits(amountIn, tokenIn?.decimals);

  const {
    isLoading: quoteIsLoading,
    error: quoteError,
    data: quote,
  } = useUniswapQuote({
    baseTokenSymbol: tokenInForPrice?.symbol!,
    quoteTokenSymbol: tokenOutForPrice?.symbol!,
    amount: amountInFmt,
  });

  const params: ExactInputSingleParams = {
    tokenIn: tokenInForPrice?.address!,
    tokenOut: tokenOutForPrice?.address!,
    fee: BigNumber.from(3000),
    recipient: receiver!,
    deadline: BigNumber.from(0),
    amountIn,
    amountOutMinimum: quote?.value
      ? parseUnits(quote.value.toExact(), tokenOut?.decimals).div('1000')
      : BigNumber.from(0),
    sqrtPriceLimitX96: BigNumber.from(0),
  };

  const contract = useContract({
    address: UNISWAP_ROUTER_02_ADDRESS,
    abi: SwapRouter02Abi,
    signerOrProvider: signer,
  });

  const { config: swapConfig, error: prepareError } = usePrepareContractWrite({
    address: UNISWAP_ROUTER_02_ADDRESS,
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
    overrides: {
      value: tokenInisETH ? amountIn : 0,
    },
    staleTime: Infinity,
    enabled: !useForkEnv,
  });

  const {
    write: swapWrite,
    data,
    isSuccess,
    isLoading,
    error: txError,
  } = useContractWrite(swapConfig);

  const swap = async () => (useForkEnv ? await contract?.exactInputSingle(params) : swapWrite?.());

  return {
    swap,
    data,
    isSuccess,
    prepareError: !useForkEnv && prepareError,
    txError,
    isLoading: quoteIsLoading || isLoading,
    quoteError,
  };
};

export default useSwap;

import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import SwapRouter02Abi from '@/abi/SwapRouter02.json';
import ApproveTokens from '@/components/ApproveTokens';
import SubmitButton from '@/components/widgets/common/SubmitButton';
import SwapItem from '@/components/widgets/swap/SwapItem';
import TransactionBreakdown from '@/components/widgets/swap/TransactionBreakdown';
import useChainId from '@/hooks/useChainId';
import useSubmitTx from '@/hooks/useSubmitTx';
import useToken from '@/hooks/useToken';
import useTokenApproval from '@/hooks/useTokenApproval';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { cleanValue } from '@/utils';

interface SwapProps {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: BigNumber;
}

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

const Swap = ({ tokenInSymbol, tokenOutSymbol, amountIn }: SwapProps) => {
  const chainId = useChainId();
  const { address: receiver } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const { data: tokenInChecked } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const { data: tokenOutChecked } = useToken(tokenOutIsETH ? 'WETH' : tokenOutSymbol);

  const amountInToUse = BigNumber.from(cleanValue(amountIn.toString(), tokenInChecked?.decimals));
  const amountIn_ = formatUnits(amountInToUse, tokenInChecked?.decimals);

  // token out quote for amount in
  const { isLoading: quoteIsLoading, data: quote } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: tokenOutSymbol,
    amount: amountIn_,
  });

  // formatted amount out quote value
  const amountOut_ = quote?.value?.toExact();

  // usdc quote for amount in
  const { isLoading: quoteIsLoadingUSDC, data: quoteUSDC } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: 'USDC',
    amount: amountIn_,
  });

  // usdc quote for token out
  const { isLoading: quoteIsLoadingTokenOutUSDC, data: quoteTokenOutUSDC } = useUniswapQuote({
    baseTokenSymbol: tokenOutSymbol,
    quoteTokenSymbol: 'USDC',
    amount: amountOut_,
  });

  const calcPrice = (quote: string | undefined, amount: string | undefined) =>
    !quote || !amount ? undefined : cleanValue((+quote / +amount).toString(), 2);

  const amountOutMinimum = quote?.value
    ? ethers.utils.parseUnits(quote.value.toExact(), tokenOutChecked?.decimals).div('1000')
    : undefined;

  const amountOutMinimum_ = amountOutMinimum
    ? cleanValue(formatUnits(amountOutMinimum, tokenOutChecked?.decimals), 2)
    : undefined;

  const params: ExactInputSingleParams = {
    tokenIn: tokenInChecked?.address!,
    tokenOut: tokenOutChecked?.address!,
    fee: BigNumber.from(3000),
    recipient: receiver!,
    deadline: BigNumber.from(0),
    amountIn: amountInToUse,
    amountOutMinimum: amountOutMinimum!,
    sqrtPriceLimitX96: BigNumber.from(0),
  };

  const { config: swapConfig } = usePrepareContractWrite({
    address: SWAP_ROUTER_02_ADDRESSES(chainId),
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
    overrides: {
      value: tokenInIsETH ? amountIn : 0,
    },
  });

  const { hasBalance, hasAllowance } = useTokenApproval(
    tokenIn?.address as `0x${string}`,
    amountIn,
    SWAP_ROUTER_02_ADDRESSES(chainId)
  );

  const { isSuccess, isError, isLoading, submitTx, isPrepared, error, hash, isPendingConfirm } =
    useSubmitTx(swapConfig.request);

  return (
    <div className="grid w-full gap-2 self-center xl:max-w-4xl">
      <div className="grid gap-2 xl:flex">
        <SwapItem
          tokenSymbol={tokenInSymbol}
          amount={amountIn_}
          amountUSD={
            tokenInSymbol === 'USDC'
              ? amountIn_
              : quoteIsLoadingUSDC
              ? undefined
              : cleanValue(quoteUSDC?.humanReadableAmount, 2)
          }
          priceUSD={
            tokenInSymbol === 'USDC'
              ? '1.00'
              : quoteIsLoadingUSDC
              ? undefined
              : cleanValue(calcPrice(quoteUSDC?.humanReadableAmount, amountIn_), 2)
          }
        />
        <SwapItem
          tokenSymbol={tokenOutSymbol}
          amount={quoteIsLoading ? undefined : cleanValue(amountOut_, 2)}
          amountUSD={
            tokenOutSymbol === 'USDC'
              ? amountOut_
              : quoteIsLoadingTokenOutUSDC
              ? undefined
              : cleanValue(quoteTokenOutUSDC?.humanReadableAmount, 2)
          }
          priceUSD={
            tokenOutSymbol === 'USDC'
              ? '1.00'
              : quoteIsLoadingTokenOutUSDC
              ? undefined
              : cleanValue(calcPrice(quoteTokenOutUSDC?.humanReadableAmount, amountOut_), 2)
          }
        />
      </div>
      <TransactionBreakdown
        tokenInSymbol={tokenInSymbol}
        tokenOutSymbol={tokenOutSymbol}
        exchangeRate={calcPrice(quote?.humanReadableAmount, amountIn_)}
        amountOutMinimum={amountOutMinimum_}
      />
      {!tokenInIsETH && !hasAllowance ? (
        <ApproveTokens
          {...{
            token: tokenIn!,
            amount: amountIn,
            spenderAddress: SWAP_ROUTER_02_ADDRESSES(chainId),
          }}
        />
      ) : (
        <SubmitButton
          styleProps="flex rounded-sm border-gray-200/25 bg-gray-900/80 p-3.5 hover:bg-gray-900"
          label={
            !hasBalance
              ? 'Insufficient balance'
              : isPendingConfirm
              ? 'Waiting for confirmation in wallet...'
              : isLoading
              ? 'Swapping...'
              : isError
              ? 'Swap error'
              : !isPrepared
              ? 'Error preparing swap'
              : isSuccess
              ? 'Swap successful'
              : 'Swap'
          }
          onClick={submitTx}
          isPendingConfirm={isPendingConfirm}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError || !hasBalance}
          disabled={quoteIsLoading || !isPrepared || !submitTx}
        />
      )}
    </div>
  );
};

export default Swap;

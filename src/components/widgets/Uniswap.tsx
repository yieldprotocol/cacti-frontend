import Image from 'next/image';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { useAccount, useNetwork, usePrepareContractWrite } from 'wagmi';
import SwapRouter02Abi from '@/abi/SwapRouter02.json';
import ApproveTokens from '@/components/ApproveTokens';
import useChainId from '@/hooks/useChainId';
import useSubmitTx from '@/hooks/useSubmitTx';
import useToken from '@/hooks/useToken';
import useTokenApproval from '@/hooks/useTokenApproval';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { Spinner, cleanValue } from '@/utils';

interface Props {
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

export const UniswapButton = ({ tokenInSymbol, tokenOutSymbol, amountIn }: Props) => {
  const chainId = useChainId();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { hasAllowance } = useTokenApproval(
    tokenIn?.address as `0x${string}`,
    amountIn,
    SWAP_ROUTER_02_ADDRESSES(chainId)
  );

  // ETH to token swap
  if (tokenInIsETH) return <SwapTokens {...{ tokenInSymbol, tokenOutSymbol, amountIn }} />;

  return (
    <>
      <ApproveTokens
        {...{
          token: tokenIn!,
          amount: amountIn,
          spenderAddress: SWAP_ROUTER_02_ADDRESSES(chainId),
        }}
      />
      {hasAllowance && <SwapTokens {...{ tokenInSymbol, tokenOutSymbol, amountIn }} />}
    </>
  );
};

const SwapItem = ({
  tokenSymbol,
  amount,
  amountUSD,
  priceUSD,
}: {
  tokenSymbol: string;
  amount: string;
  amountUSD?: string;
  priceUSD?: string;
}) => {
  const { chain } = useNetwork();
  const { data: token } = useToken(tokenSymbol);
  return (
    <div className="flex w-full justify-center rounded-sm bg-gray-700 shadow-lg">
      <div className="flex flex-1 gap-2 rounded-l-sm border border-gray-200/25 p-3.5">
        <div className="my-auto flex-none rounded-full bg-gray-200/70 p-[1px] shadow-sm">
          <Image
            src={
              `https://storage.googleapis.com/zapper-fi-assets/tokens/${
                chain?.name.toLowerCase() === 'mainnet fork' ? 'ethereum' : chain?.name
              }/${token?.address.toLowerCase()}.png` ||
              'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png'
            }
            alt={tokenSymbol}
            width={30}
            height={30}
          />
        </div>
        <div className="my-auto flex flex-col justify-end text-left">
          <span className="text-xl md:text-3xl">{token?.symbol}</span>
          <span className="flex gap-1 text-sm font-light text-gray-300">
            <span>$</span>
            <span>{priceUSD}</span>
          </span>
        </div>
      </div>
      <div className="my-auto flex flex-1 justify-end gap-4 rounded-r-sm border border-gray-200/25 bg-gray-900/50 p-3.5">
        <div className="flex flex-col p-1 text-right">
          <span className="text-3xl">{amount}</span>
          <span className="flex justify-end gap-1 text-sm font-light text-gray-300">
            <span>$</span>
            <span>{amountUSD}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

const TransactionBreakdown = ({
  tokenInSymbol,
  tokenOutSymbol,
  exchangeRate,
  amountOutMinimum,
}: {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  exchangeRate?: string;
  amountOutMinimum?: string;
}) => {
  return (
    <div className="grid gap-1.5 rounded-sm border border-gray-200/25 bg-gray-700 p-3.5 shadow-lg">
      <div className="mb-1 text-sm font-medium text-gray-100">Transaction Breakdown</div>
      <div className="rounded-sm bg-gray-900/50 p-3.5">
        <div className="flex justify-between text-sm text-gray-400">
          <div className="font-medium">Exchange Rate</div>
          <div className="text-gray-100">
            1 {tokenInSymbol} = {exchangeRate} {tokenOutSymbol}
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-400">
          <div className="text-sm text-gray-400">Minimum {tokenOutSymbol} Received</div>
          <div className="">{amountOutMinimum}</div>
        </div>
      </div>
    </div>
  );
};

const SubmitButton = ({
  isPendingConfirm,
  isLoading,
  isSuccess,
  isError,
  onClick,
}: {
  isPendingConfirm: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  onClick: () => void;
}) => (
  <button
    className={`flex rounded-sm border border-gray-200/25 bg-gray-900/80 p-3.5 hover:cursor-pointer hover:bg-gray-900 disabled:cursor-not-allowed`}
    onClick={onClick}
    disabled={isLoading || isPendingConfirm || isSuccess || isError}
  >
    <div className="mx-auto flex gap-2">
      <div className="flex items-center">
        {(isLoading || isPendingConfirm) && <Spinner className="h-5 w-5 text-gray-100" />}
        {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-500/80" />}
        {isError && <XCircleIcon className="h-5 w-5 text-red-500/80" />}
      </div>
      <div className="flex items-center text-xl">
        {!isLoading && !isSuccess && !isError && !isPendingConfirm && <span>Swap</span>}
        {isPendingConfirm && <span>Waiting for wallet confirmation...</span>}
        {isLoading && <span>Swapping...</span>}
        {isSuccess && <span>Swapped!</span>}
        {isError && <span>Swap Failed</span>}
      </div>
    </div>
  </button>
);

const SwapTokens = ({ tokenInSymbol, tokenOutSymbol, amountIn }: Props) => {
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

  const { hasBalance } = useTokenApproval(
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
          amountUSD={cleanValue(
            tokenInSymbol === 'USDC' ? amountIn_ : quoteUSDC?.humanReadableAmount,
            2
          )}
          priceUSD={
            tokenInSymbol === 'USDC' ? '1.00' : calcPrice(quoteUSDC?.humanReadableAmount, amountIn_)
          }
        />
        <SwapItem
          tokenSymbol={tokenOutSymbol}
          amount={cleanValue(amountOut_, 2)}
          amountUSD={
            tokenOutSymbol === 'USDC'
              ? amountOut_
              : cleanValue(quoteTokenOutUSDC?.humanReadableAmount, 2)
          }
          priceUSD={
            tokenOutSymbol === 'USDC'
              ? '1.00'
              : calcPrice(quoteTokenOutUSDC?.humanReadableAmount, amountOut_)
          }
        />
      </div>
      <TransactionBreakdown
        tokenInSymbol={tokenInSymbol}
        tokenOutSymbol={tokenOutSymbol}
        exchangeRate={cleanValue(calcPrice(quote?.humanReadableAmount!, amountIn_), 2)}
        amountOutMinimum={amountOutMinimum_}
      />
      <SubmitButton
        onClick={submitTx}
        isPendingConfirm={isPendingConfirm}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
      />
    </div>
  );
};

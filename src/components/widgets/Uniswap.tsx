import Image from 'next/image';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { Currency, CurrencyAmount } from '@uniswap/sdk-core';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { useAccount, useNetwork, usePrepareContractWrite } from 'wagmi';
import SwapRouter02Abi from '@/abi/SwapRouter02.json';
import ApproveTokens from '@/components/ApproveTokens';
import { Button } from '@/components/Button';
import { TxStatus } from '@/components/TxStatus';
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
              token?.logoURI ||
              `https://storage.googleapis.com/zapper-fi-assets/tokens/${chain?.name}/${token?.address}.png` ||
              'https://storage.googleapis.com/zapper-fi-assets/tokens/ethereum/0x0000000000000000000000000000000000000000.png'
            }
            alt={tokenSymbol}
            width={30}
            height={30}
          />
        </div>
        <div className="flex flex-col p-1 text-left">
          <span className="text-md font-semibold">{token?.symbol}</span>
          <span className="flex gap-1 text-sm font-light text-gray-300">
            <span>$</span>
            {priceUSD}
          </span>
        </div>
      </div>
      <div className="flex flex-1 justify-end gap-4 rounded-r-sm border border-gray-200/25 bg-gray-900/50 p-3.5">
        <div className="flex flex-col p-1 text-right">
          <span className="text-md font-semibold">{cleanValue(amount, 2)}</span>
          <span className="flex gap-1 text-sm font-light text-gray-300">
            <span>$</span>
            {amountUSD}
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
  exchangeRate: string;
  amountOutMinimum: string;
}) => {
  return (
    <div className="grid gap-1.5 rounded-sm border border-gray-200/25 bg-gray-700 p-3.5 shadow-lg">
      <div className="mb-1 text-sm font-medium text-gray-100">Transaction Breakdown</div>
      <div className="rounded-sm bg-gray-900/50 p-3">
        <div className="flex justify-between text-sm text-gray-400">
          <div className="font-medium">Exchange Rate</div>
          <div className="">
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
  const amountOut_ = quote?.value ? quote.value.toExact() : '0';

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

  const calcPrice = (quote: string, amount: string) => {
    return cleanValue((+quote / +amount).toString(), 2);
  };

  const amountOutMinimum = quote?.value
    ? ethers.utils.parseUnits(quote.value.toExact(), tokenOutChecked?.decimals).div('1000')
    : BigNumber.from(0);

  const amountOutMinimum_ = cleanValue(formatUnits(amountOutMinimum, tokenOutChecked?.decimals), 2);

  const params: ExactInputSingleParams = {
    tokenIn: tokenInChecked?.address!,
    tokenOut: tokenOutChecked?.address!,
    fee: BigNumber.from(3000),
    recipient: receiver!,
    deadline: BigNumber.from(0),
    amountIn: amountInToUse,
    amountOutMinimum,
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

  const { isSuccess, isError, isPending, submitTx, isPrepared, error, hash } = useSubmitTx(
    swapConfig.request
  );

  return (
    <div className="grid gap-2 md:max-w-xl">
      <div className="grid gap-2 xl:flex">
        <SwapItem
          tokenSymbol={tokenInSymbol}
          amount={amountIn_}
          amountUSD={cleanValue(quoteUSDC?.humanReadableAmount, 2)}
          priceUSD={calcPrice(quoteUSDC?.humanReadableAmount!, amountIn_)}
        />
        <SwapItem
          tokenSymbol={tokenOutSymbol}
          amount={amountOut_}
          amountUSD={cleanValue(quoteTokenOutUSDC?.humanReadableAmount, 2)}
          priceUSD={calcPrice(quoteTokenOutUSDC?.humanReadableAmount!, amountOut_)}
        />
      </div>
      <TransactionBreakdown
        tokenInSymbol={tokenInSymbol}
        tokenOutSymbol={tokenOutSymbol}
        exchangeRate={cleanValue(calcPrice(quote?.humanReadableAmount!, amountIn_), 2)}
        amountOutMinimum={amountOutMinimum_}
      />
      {/* <SubmitButton /> */}
    </div>
  );
};

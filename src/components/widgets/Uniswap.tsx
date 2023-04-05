import { XCircleIcon } from '@heroicons/react/20/solid';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { useAccount, usePrepareContractWrite } from 'wagmi';
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
    <div>
      <ApproveTokens
        {...{
          token: tokenIn!,
          amount: amountIn,
          spenderAddress: SWAP_ROUTER_02_ADDRESSES(chainId),
        }}
      />
      {hasAllowance && <SwapTokens {...{ tokenInSymbol, tokenOutSymbol, amountIn }} />}
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

  const { isLoading: quoteIsLoading, data: quote } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: tokenOutSymbol,
    amount: ethers.utils.formatUnits(amountInToUse, tokenInChecked?.decimals),
  });

  const params: ExactInputSingleParams = {
    tokenIn: tokenInChecked?.address!,
    tokenOut: tokenOutChecked?.address!,
    fee: BigNumber.from(3000),
    recipient: receiver!,
    deadline: BigNumber.from(0),
    amountIn: amountInToUse,
    amountOutMinimum: quote?.value
      ? ethers.utils.parseUnits(quote.value.toExact(), tokenOutChecked?.decimals).div('1000')
      : BigNumber.from(0),
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
    <div className="flex">
      {!isSuccess && (
        <Button
          className={isError ? 'border border-red-500' : ''}
          disabled={!submitTx || isPending || quoteIsLoading || !isPrepared || isError}
          onClick={submitTx}
        >
          <div className="flex gap-2 align-middle">
            {isPending ? (
              <Spinner className="mr-0 h-4 self-center" />
            ) : !isPrepared || isError ? (
              <>
                <div className="">
                  <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                </div>
              </>
            ) : (
              <></>
            )}
            {!hasBalance
              ? 'Insufficient balance'
              : !isPrepared
              ? 'Error preparing swap'
              : isError
              ? 'Error executing transaction'
              : quoteIsLoading
              ? 'Quote loading...'
              : isPending
              ? 'Pending...'
              : 'Swap'}
          </div>
        </Button>
      )}
      {isSuccess && <TxStatus hash={hash!} />}
    </div>
  );
};

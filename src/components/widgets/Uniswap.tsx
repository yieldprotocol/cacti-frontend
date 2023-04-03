import { XCircleIcon } from '@heroicons/react/20/solid';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber } from 'ethers';
import ApproveTokens from '@/components/ApproveTokens';
import { Button } from '@/components/Button';
import { TxStatus } from '@/components/TxStatus';
import useChainId from '@/hooks/useChainId';
import useSwap from '@/hooks/useSwap';
import useToken from '@/hooks/useToken';
import useTokenApproval from '@/hooks/useTokenApproval';
import { Spinner } from '@/utils';

interface Props {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: BigNumber;
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
  const { swap, txPending, txSuccess, txError, prepareError, hash, quoteIsLoading } = useSwap(
    tokenInSymbol,
    tokenOutSymbol,
    amountIn
  );
  const { data: tokenIn } = useToken(tokenInSymbol);
  const { hasBalance } = useTokenApproval(
    tokenIn?.address as `0x${string}`,
    amountIn,
    SWAP_ROUTER_02_ADDRESSES(chainId)
  );

  return (
    <div className="flex">
      {!txSuccess && (
        <Button
          className={prepareError || txError ? 'border border-red-500' : ''}
          disabled={!swap || txPending || quoteIsLoading || prepareError || txError}
          onClick={swap}
        >
          <div className="flex gap-2 align-middle">
            {txPending ? (
              <Spinner className="mr-0 h-4 self-center" />
            ) : prepareError || txError ? (
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
              : prepareError
              ? 'Error preparing swap'
              : txError
              ? 'Error executing transaction'
              : quoteIsLoading
              ? 'Quote loading...'
              : txPending
              ? 'Pending...'
              : 'Swap'}
          </div>
        </Button>
      )}
      {txSuccess && <TxStatus hash={hash!} />}
    </div>
  );
};

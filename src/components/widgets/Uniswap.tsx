import { useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';
import { BigNumber } from 'ethers';
import { erc20ABI, useAccount, useContractRead } from 'wagmi';
import ApproveTokens from '@/components/ApproveTokens';
import { Button } from '@/components/Button';
import { TxStatus } from '@/components/TxStatus';
import { WidgetError } from '@/components/widgets/helpers';
import useSwap from '@/hooks/useSwap';
import useToken from '@/hooks/useToken';
import useTokenApproval from '@/hooks/useTokenApproval';
import { Spinner } from '@/utils';
import { UNISWAP_ROUTER_02_ADDRESS } from '@/utils/constants';

interface Props {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: BigNumber;
}

export const UniswapButton = ({ tokenInSymbol, tokenOutSymbol, amountIn }: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { hasAllowance } = useTokenApproval({
    address: tokenIn?.address as `0x${string}`,
    amount: amountIn,
    spenderAddress: UNISWAP_ROUTER_02_ADDRESS,
  });

  const [hasBalance, setHasBalance] = useState(false);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: tokenIn?.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [receiver!],
    enabled: !!tokenIn && !tokenInIsETH,
  });

  // ETH to token swap
  if (tokenInIsETH) return <SwapTokens {...{ tokenInSymbol, tokenOutSymbol, amountIn }} />;

  return (
    <div className="flex gap-2">
      {hasAllowance ? (
        <SwapTokens {...{ tokenInSymbol, tokenOutSymbol, amountIn }} />
      ) : (
        <ApproveTokens
          {...{
            token: tokenIn!,
            amount: amountIn,
            spenderAddress: UNISWAP_ROUTER_02_ADDRESS,
          }}
        />
      )}
    </div>
  );
};

const SwapTokens = ({ tokenInSymbol, tokenOutSymbol, amountIn }: Props) => {
  const { swap, txPending, txSuccess, txError, prepareError, hash, quoteIsLoading } = useSwap(
    tokenInSymbol,
    tokenOutSymbol,
    amountIn
  );

  return (
    <div className="flex">
      {!txSuccess && (
        <Button
          className={prepareError || txError ? 'border border-red-500' : ''}
          disabled={!swap || txPending}
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
            {prepareError
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

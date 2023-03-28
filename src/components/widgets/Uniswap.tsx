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
  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: tokenIn?.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [receiver!],
    enabled: !!tokenIn && !tokenInIsETH,
  });

  // Get allowance amount
  const { data: allowanceAmount } = useContractRead({
    address: tokenIn?.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [receiver!, UNISWAP_ROUTER_02_ADDRESS],
    enabled: !tokenInIsETH,
  });

  useEffect(() => {
    setHasBalance(balance! && BigNumber.from(balance).gte(amountIn));
    setHasAllowance(allowanceAmount! && BigNumber.from(allowanceAmount).gte(amountIn));
  }, [allowanceAmount, amountIn, balance]);

  // ETH to token swap
  if (tokenInIsETH) return <SwapTokens {...{ tokenInSymbol, tokenOutSymbol, amountIn }} />;

  return (
    <div>
      {!hasAllowance && !isApprovalSuccess && (
        <ApproveTokens
          {...{
            token: tokenIn!,
            amount: amountIn,
            setIsApprovalSuccess,
            spenderAddress: UNISWAP_ROUTER_02_ADDRESS,
          }}
        />
      )}
      {(hasAllowance || isApprovalSuccess) && (
        <SwapTokens {...{ tokenInSymbol, tokenOutSymbol, amountIn }} />
      )}
    </div>
  );
};

const SwapTokens = ({ tokenInSymbol, tokenOutSymbol, amountIn }: Props) => {
  const { swap, isLoading, isSuccess, prepareError, txError, hash } = useSwap(
    tokenInSymbol,
    tokenOutSymbol,
    amountIn
  );

  return (
    <div className="flex">
      {!isSuccess && (
        <Button
          className={prepareError || txError ? 'border border-red-500' : ''}
          disabled={!swap || isLoading}
          onClick={swap}
        >
          <div className="flex gap-2 align-middle">
            {isLoading ? (
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
              : 'Send'}
          </div>
        </Button>
      )}
      {isSuccess && <TxStatus hash={hash!} />}
    </div>
  );
};

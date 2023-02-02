import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { Button } from '@/components/Button';
import SwapRouter02Abi from '../abi/SwapRouter02.json';

interface Props {
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
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

const swapRouter02Address = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';

export const UniswapButton = ({ tokenIn, tokenOut, amountIn }: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();

  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: tokenIn as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [receiver],
  });

  // Get allowance amount
  const { data: allowanceAmount } = useContractRead({
    address: tokenIn as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [receiver, swapRouter02Address],
  });

  // Get approval ready
  const { config: tokenConfig } = usePrepareContractWrite({
    address: tokenIn as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    args: [swapRouter02Address, BigNumber.from(amountIn)],
  });
  const { write: tokenWrite, isSuccess: isApprovalSuccess } = useContractWrite(tokenConfig);

  // Get swap ready
  const params: ExactInputSingleParams = {
    tokenIn: tokenIn,
    tokenOut: tokenOut,
    fee: BigNumber.from(3000),
    recipient: receiver,
    deadline: BigNumber.from(0),
    amountIn: BigNumber.from(amountIn),
    amountOutMinimum: BigNumber.from(0),
    sqrtPriceLimitX96: BigNumber.from(0),
  };

  const { config: swapConfig } = usePrepareContractWrite({
    address: swapRouter02Address,
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
  });

  const { write: swapWrite, isSuccess: isSwapSuccess } = useContractWrite(swapConfig);

  useEffect(() => {
    setHasBalance(balance && BigNumber.from(balance).gte(BigNumber.from(amountIn)));
    setHasAllowance(
      allowanceAmount && BigNumber.from(allowanceAmount).gte(BigNumber.from(amountIn))
    );
  }, [balance, allowanceAmount, amountIn, isApprovalSuccess, isSwapSuccess]);

  return (
    <div>
      {!hasBalance && <Button disabled>Insufficient Balance</Button>}
      {hasBalance && !hasAllowance && (
        <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
          Approve Tokens
        </Button>
      )}
      {hasBalance && hasAllowance && (
        <Button disabled={!swapWrite} onClick={() => swapWrite?.()}>
          Swap Tokens
        </Button>
      )}
    </div>
  );
};

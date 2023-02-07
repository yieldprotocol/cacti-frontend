import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
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
  const isEth = tokenIn == 'ETH';

  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);
  const [isSwapSuccess, setIsSwapSuccess] = useState(false);

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

  useEffect(() => {
    setHasBalance(balance && BigNumber.from(balance).gte(BigNumber.from(amountIn)));
    setHasAllowance(
      allowanceAmount && BigNumber.from(allowanceAmount).gte(BigNumber.from(amountIn))
    );
  }, [balance, allowanceAmount, amountIn, isApprovalSuccess, receiver]);

  if (isEth)
    return (
      <SwapTokens
        tokenIn={tokenIn}
        tokenOut={tokenOut}
        amountIn={amountIn}
        setIsSwapSuccess={setIsSwapSuccess}
      />
    );

  return (
    <div>
      {!hasBalance && <Button disabled>Insufficient Balance</Button>}
      {hasBalance && !hasAllowance && !isApprovalSuccess && (
        <ApproveTokens
          tokenIn={tokenIn}
          amountIn={amountIn}
          setIsApprovalSuccess={setIsApprovalSuccess}
        />
      )}
      {hasBalance && (hasAllowance || isApprovalSuccess) && (
        <SwapTokens
          tokenIn={tokenIn}
          tokenOut={tokenOut}
          amountIn={amountIn}
          setIsSwapSuccess={setIsSwapSuccess}
        />
      )}
    </div>
  );
};

const ApproveTokens = ({
  tokenIn,
  amountIn,
  setIsApprovalSuccess,
}: Pick<Props, 'tokenIn' | 'amountIn'> & {
  setIsApprovalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Get approval ready
  const { config: tokenConfig } = usePrepareContractWrite({
    address: tokenIn as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    args: [swapRouter02Address, BigNumber.from(amountIn)],
  });
  const { write: tokenWrite, data } = useContractWrite(tokenConfig);
  const { isLoading, isSuccess: isApprovalSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    setIsApprovalSuccess(isApprovalSuccess);
  }, [setIsApprovalSuccess, isApprovalSuccess]);

  return (
    <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
      {isLoading ? <div>Approving...</div> : `Approve ${amountIn} ${tokenIn}`}
      {!isLoading && isApprovalSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </Button>
  );
};

const SwapTokens = ({
  tokenIn,
  tokenOut,
  amountIn,
  setIsSwapSuccess,
}: Props & { setIsSwapSuccess: React.Dispatch<React.SetStateAction<boolean>> }) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const isEth = tokenIn == 'ETH';
  const WETH = '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'; // Goerli WETH address

  const params: ExactInputSingleParams = {
    tokenIn: isEth ? WETH : tokenIn,
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
    overrides: {
      value: isEth ? BigNumber.from(amountIn) : 0,
    },
  });

  const { write: swapWrite, data } = useContractWrite(swapConfig);
  const { isLoading, isSuccess: isSwapSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    setIsSwapSuccess(isSwapSuccess);
  }, [setIsSwapSuccess, isSwapSuccess]);

  if (isSwapSuccess) return <Button>Swap Successful</Button>;

  return (
    <>
      {isLoading ? (
        <Button>Swapping...</Button>
      ) : (
        <Button disabled={!swapWrite} onClick={() => swapWrite?.()}>
          Swap {amountIn} {tokenIn} for {tokenOut}
        </Button>
      )}
    </>
  );
};

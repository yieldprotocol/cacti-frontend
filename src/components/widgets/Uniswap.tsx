import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { Button } from '@/components/Button';
import { findTokenByAddress, findTokenBySymbol, formatToEther } from '@/utils';
import SwapRouter02Abi from '../../abi/SwapRouter02.json';

interface Props {
  tokenInAddress: string;
  tokenOutAddress: string;
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

const swapRouter02Address = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45';

export const UniswapButton = ({ tokenInAddress, tokenOutAddress, amountIn }: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const isEth = tokenInAddress == 'ETH';

  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);
  const [isSwapSuccess, setIsSwapSuccess] = useState(false);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: tokenInAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [receiver],
  });

  // Get allowance amount
  const { data: allowanceAmount } = useContractRead({
    address: tokenInAddress as `0x${string}`,
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
    return <SwapTokens {...{ tokenInAddress, tokenOutAddress, amountIn, setIsSwapSuccess }} />;

  return (
    <div>
      {!hasAllowance && !isApprovalSuccess && (
        <ApproveTokens {...{ tokenInAddress, amountIn, setIsApprovalSuccess }} />
      )}
      {(hasAllowance || isApprovalSuccess) && (
        <SwapTokens {...{ tokenInAddress, tokenOutAddress, amountIn, setIsSwapSuccess }} />
      )}
    </div>
  );
};

const ApproveTokens = ({
  tokenInAddress,
  amountIn,
  setIsApprovalSuccess,
}: Pick<Props, 'tokenInAddress' | 'amountIn'> & {
  setIsApprovalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { chain } = useNetwork();
  // Get approval ready
  const { config: tokenConfig } = usePrepareContractWrite({
    address: tokenInAddress as `0x${string}`,
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
    <div>
      <div>
        <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
          {isLoading ? 'Pending...' : 'Approve'}
        </Button>
      </div>
      First, approve Uniswap router for {formatToEther(amountIn.toString())}{' '}
      {findTokenByAddress(tokenInAddress, chain?.id || 1).symbol}
      {!isLoading && isApprovalSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

const SwapTokens = ({
  tokenInAddress,
  tokenOutAddress,
  amountIn,
  setIsSwapSuccess,
}: Props & { setIsSwapSuccess: React.Dispatch<React.SetStateAction<boolean>> }) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const { chain } = useNetwork();
  console.log(tokenInAddress);
  const isEth = tokenInAddress == 'ETH';

  const params: ExactInputSingleParams = {
    tokenIn: isEth ? findTokenBySymbol('WETH', chain.id).address : tokenInAddress,
    tokenOut: tokenOutAddress,
    fee: BigNumber.from(3000),
    recipient: receiver,
    deadline: BigNumber.from(0),
    amountIn: BigNumber.from(amountIn),
    amountOutMinimum: BigNumber.from(0),
    sqrtPriceLimitX96: BigNumber.from(0),
  };
  console.log(params);

  const { config: swapConfig, error } = usePrepareContractWrite({
    address: swapRouter02Address,
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
    overrides: {
      value: isEth ? BigNumber.from(amountIn) : 0,
    },
  });
  const err: Error & { reason?: string } = error;

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
        <div>
          <Button disabled={!swapWrite} onClick={() => swapWrite?.()}>
            Send
          </Button>
          {err && (
            <div className="pt-2 text-sm text-red-800">
              Error simulating transaction: {err.reason || err.message}
            </div>
          )}
        </div>
      )}
    </>
  );
};

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
import { TxStatus } from '@/components/TxStatus';
import { WidgetError } from '@/components/widgets/helpers';
import { Token } from '@/types';
import { findTokenBySymbol, formatToEther } from '@/utils';
import SwapRouter02Abi from '../../abi/SwapRouter02.json';

interface Props {
  tokenIn: Token;
  tokenOut: Token;
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

export const UniswapButton = ({ tokenIn, tokenOut, amountIn }: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: tokenIn.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [receiver],
  });

  // Get allowance amount
  const { data: allowanceAmount } = useContractRead({
    address: tokenIn.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [receiver, swapRouter02Address],
  });

  useEffect(() => {
    setHasBalance(balance && BigNumber.from(balance).gte(amountIn));
    setHasAllowance(allowanceAmount && BigNumber.from(allowanceAmount).gte(amountIn));
  }, [balance, allowanceAmount, amountIn, isApprovalSuccess, receiver]);

  // ETH to token swap
  if (tokenIn.symbol === 'ETH') return <SwapTokens {...{ tokenIn, tokenOut, amountIn }} />;

  return (
    <div>
      {!hasAllowance && !isApprovalSuccess && (
        <ApproveTokens {...{ tokenIn, amountIn, setIsApprovalSuccess }} />
      )}
      {(hasAllowance || isApprovalSuccess) && <SwapTokens {...{ tokenIn, tokenOut, amountIn }} />}
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
  const { chain } = useNetwork();
  // Get approval ready
  const { config: tokenConfig } = usePrepareContractWrite({
    address: tokenIn.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    args: [swapRouter02Address, amountIn],
  });
  const { write: tokenWrite, data } = useContractWrite(tokenConfig);
  const { isLoading, isSuccess: isApprovalSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    setIsApprovalSuccess(isApprovalSuccess);
  }, [setIsApprovalSuccess, isApprovalSuccess]);

  return (
    <div>
      <div className="flex justify-end">
        <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
          {isLoading ? 'Pending...' : 'Approve'}
        </Button>
      </div>
      {!isLoading && isApprovalSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
};

const SwapTokens = ({ tokenIn, tokenOut, amountIn }: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const { chain } = useNetwork();
  const isEth = tokenIn.symbol == 'ETH';
  const tokenOutIsEth = tokenOut.symbol == 'ETH';

  const params: ExactInputSingleParams = {
    tokenIn: isEth ? 'ETH' : tokenIn.address,
    tokenOut: isEth ? 'ETH' : tokenOut.address,
    fee: BigNumber.from(3000),
    recipient: receiver,
    deadline: BigNumber.from(0),
    amountIn,
    amountOutMinimum: BigNumber.from(0),
    sqrtPriceLimitX96: BigNumber.from(0),
  };

  // switch this to use a router
  const { config: swapConfig, error } = usePrepareContractWrite({
    address: swapRouter02Address,
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
    overrides: {
      value: isEth ? amountIn : 0,
    },
  });
  const err: Error & { reason?: string } = error;

  const { write: swapWrite, data, isSuccess } = useContractWrite(swapConfig);

  return (
    <>
      <div className="flex justify-end">
        {!isSuccess && (
          <Button disabled={!swapWrite} onClick={() => swapWrite?.()}>
            Send
          </Button>
        )}
        {isSuccess && <TxStatus hash={data?.hash} />}
        {err && (
          <WidgetError>Error simulating transaction: {err.reason || err.message}</WidgetError>
        )}
      </div>
    </>
  );
};

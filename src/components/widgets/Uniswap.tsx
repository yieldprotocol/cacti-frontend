import { useEffect, useState } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
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
import { WidgetError } from '@/components/widgets/helpers';
import { Spinner, findTokenByAddress, findTokenBySymbol, formatToEther } from '@/utils';
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

export const UniswapButton = ({
  tokenInSymbol,
  tokenOutSymbol,
  amountIn,
}: {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: string;
}) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const isEth = tokenInSymbol == 'ETH';
  const { chain } = useNetwork();
  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);
  const [isSwapSuccess, setIsSwapSuccess] = useState(false);

  const tokenInAddress =
    tokenInSymbol === 'ETH' ? 'ETH' : findTokenBySymbol(tokenInSymbol, chain?.id)?.address;
  const tokenOutAddress =
    tokenOutSymbol === 'ETH'
      ? findTokenBySymbol('WETH', chain?.id)?.address
      : findTokenBySymbol(tokenOutSymbol, chain?.id)?.address;
  const tokenInDecimals =
    tokenInSymbol === 'ETH' ? '18' : findTokenBySymbol(tokenInSymbol, chain?.id).decimals;
  const parsedAmountIn = parseUnits(amountIn, tokenInDecimals);
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
    setHasBalance(balance && BigNumber.from(balance).gte(parsedAmountIn));
    setHasAllowance(allowanceAmount && BigNumber.from(allowanceAmount).gte(parsedAmountIn));
  }, [balance, allowanceAmount, parsedAmountIn, isApprovalSuccess, receiver]);

  if (isEth)
    return (
      <SwapTokens
        {...{ tokenInAddress, tokenOutAddress, amountIn: parsedAmountIn, setIsSwapSuccess }}
      />
    );

  return (
    <div>
      {!hasAllowance && !isApprovalSuccess && (
        <ApproveTokens {...{ tokenInAddress, amountIn: parsedAmountIn, setIsApprovalSuccess }} />
      )}
      {(hasAllowance || isApprovalSuccess) && (
        <SwapTokens
          {...{ tokenInAddress, tokenOutAddress, amountIn: parsedAmountIn, setIsSwapSuccess }}
        />
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
    args: [swapRouter02Address, amountIn],
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
    amountIn,
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
      value: isEth ? amountIn : 0,
    },
  });
  const err: Error & { reason?: string } = error;

  const { write: swapWrite, data } = useContractWrite(swapConfig);
  const { isLoading, isSuccess: isSwapSuccess } = useWaitForTransaction({ hash: data?.hash });

  return (
    <>
      <div>
        {isLoading ? (
          <Button className="flex items-center" disabled>
            <Spinner /> Swapping...
          </Button>
        ) : data?.hash ? (
          <div className="flex items-center disabled:border-0 disabled:bg-green-700">
            <CheckCircleIcon className="h-5 h-5 text-green-600" />
            <div className="p-1 text-green-600">Success</div>
          </div>
        ) : (
          <Button disabled={!swapWrite} onClick={() => swapWrite?.()}>
            Send
          </Button>
        )}
        {data?.hash && (
          <div>
            <a
              className="text-blue-200 underline"
              href={`https://goerli.etherscan.io/tx/${data?.hash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Etherscan
            </a>
          </div>
        )}
        {err && (
          <WidgetError>Error simulating transaction: {err.reason || err.message}</WidgetError>
        )}
      </div>
    </>
  );
};

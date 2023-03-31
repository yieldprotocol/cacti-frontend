import { useEffect, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import ApproveTokens from '@/components/ApproveTokens';
import { Button } from '@/components/Button';
import { TxStatus } from '@/components/TxStatus';
import { WidgetError } from '@/components/widgets/helpers';
import useTokenApproval from '@/hooks/useTokenApproval';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { Token } from '@/types';
import { cleanValue, findTokenBySymbol, formatToEther } from '@/utils';
import { Spinner } from '@/utils';
import { UNISWAP_ROUTER_02_ADDRESS } from '@/utils/constants';
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
  const { hasAllowance } = useTokenApproval(
    tokenIn.address as `0x${string}`,
    amountIn,
    swapRouter02Address
  );

  // ETH to token swap
  if (tokenIn.symbol === 'ETH') return <SwapTokens {...{ tokenIn, tokenOut, amountIn }} />;

  return (
    <div>
      <ApproveTokens
        {...{
          token: tokenIn,
          amount: amountIn,
          spenderAddress: UNISWAP_ROUTER_02_ADDRESS,
        }}
      />
      {hasAllowance && <SwapTokens {...{ tokenIn, tokenOut, amountIn }} />}
    </div>
  );
};

const SwapTokens = ({ tokenIn, tokenOut, amountIn }: Props) => {
  // Owner is the receiver
  const { address: receiver } = useAccount();
  const { chain } = useNetwork();
  const isEth = tokenIn.symbol == 'ETH';
  const tokenInChecked = isEth ? findTokenBySymbol('WETH', chain?.id!) : tokenIn;
  const amountInToUse = BigNumber.from(cleanValue(amountIn.toString(), tokenInChecked.decimals));

  const {
    isLoading: quoteIsLoading,
    error: quoteError,
    data: quote,
  } = useUniswapQuote({
    baseTokenSymbol: tokenInChecked.symbol,
    quoteTokenSymbol: tokenOut.symbol,
    amount: ethers.utils.formatUnits(amountInToUse, tokenInChecked.decimals),
  });

  const params: ExactInputSingleParams = {
    tokenIn: tokenInChecked.address,
    tokenOut: tokenOut.address,
    fee: BigNumber.from(3000),
    recipient: receiver!,
    deadline: BigNumber.from(0),
    amountIn: amountInToUse,
    amountOutMinimum: quote?.value
      ? ethers.utils.parseUnits(quote.value.toExact(), tokenOut.decimals).div('1000')
      : BigNumber.from(0),
    sqrtPriceLimitX96: BigNumber.from(0),
  };

  const { config: swapConfig, error } = usePrepareContractWrite({
    address: swapRouter02Address,
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
    overrides: {
      value: isEth ? amountIn : 0,
    },
  });

  const { write: swapWrite, data, isSuccess } = useContractWrite(swapConfig);

  return (
    <>
      <div className="flex justify-end">
        {!isSuccess && (
          <Button
            className="px-4"
            disabled={!swapWrite || quoteIsLoading}
            onClick={() => swapWrite?.()}
          >
            <div className="flex gap-2">
              Send
              {quoteIsLoading ? <Spinner className="mr-0 h-4 self-center" /> : <></>}
            </div>
          </Button>
        )}
        {isSuccess && <TxStatus hash={data?.hash!} />}
        {error && <WidgetError>Error simulating transaction: {error.message}</WidgetError>}
      </div>
    </>
  );
};

import { useMemo } from 'react';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { Address, useAccount, usePrepareContractWrite } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  ListResponse,
  TextResponse,
} from '@/components/cactiComponents';
import { DoubleLineResponse } from '@/components/cactiComponents/DoubleLineResponse';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { cleanValue } from '@/utils';
import { ConnectFirst } from '../helpers/ConnectFirst';
import SwapRouter02Abi from './SwapRouter02';

interface UniswapProps {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  inputAmount: string;
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

const Uniswap = ({ tokenInSymbol, tokenOutSymbol, inputAmount }: UniswapProps) => {
  const chainId = useChainId();

  const { address: recipient } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const { data: tokenInChecked } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const { data: tokenOutChecked } = useToken(tokenOutIsETH ? 'WETH' : tokenOutSymbol);
  const input = useInput(inputAmount, tokenInChecked?.symbol!);
  const slippage = 0.5; // in percentage terms
  const getSlippageAdjustedAmount = (amount: BigNumber) =>
    BigNumber.from(amount)
      .mul(10000 - slippage * 100)
      .div(10000);

  // token out quote for amount in
  const { data: quote } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: tokenOutSymbol,
    amount: inputAmount,
  });

  // usdc quote for amount in
  const { data: quoteUSDC } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: 'USDC',
    amount: inputAmount,
  });

  // usdc RATE for token out (1 USDC)
  const { data: tokenOutUSDRate } = useUniswapQuote({
    baseTokenSymbol: tokenOutSymbol,
    quoteTokenSymbol: 'USDC',
    amount: undefined,
  });

  const amountOut = useInput(quote?.value.toExact()!, tokenOutChecked?.symbol!);
  const amountOutMinimum = getSlippageAdjustedAmount(amountOut.value || ethers.constants.Zero);
  const amountOutMinimum_ = cleanValue(formatUnits(amountOutMinimum, tokenOutChecked?.decimals), 2);

  const calcPrice = (quote: string | undefined, amount: string | undefined) =>
    !quote || !amount ? undefined : cleanValue((+quote / +amount).toString(), 2);

  const calcUSDValue = (amount: string | undefined) =>
    !tokenOutUSDRate?.humanReadableAmount || !amount
      ? undefined
      : cleanValue((+amount * +tokenOutUSDRate.humanReadableAmount).toString(), 2);

  const approval = useMemo<ApprovalBasicParams>(
    () => ({
      tokenAddress: tokenIn?.address!,
      approvalAmount: input.value!,
      spender: SWAP_ROUTER_02_ADDRESSES(chainId) as Address,
    }),
    [chainId, input.value, tokenIn?.address]
  );

  const { config } = usePrepareContractWrite({
    address: SWAP_ROUTER_02_ADDRESSES(chainId) as Address,
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [
      {
        tokenIn: tokenInChecked?.address!,
        tokenOut: tokenOutChecked?.address!,
        fee: 3000,
        recipient: recipient!,
        amountIn: input.value!,
        amountOutMinimum,
        sqrtPriceLimitX96: BigNumber.from(0),
      },
    ],
    overrides: {
      value: tokenInIsETH ? input.value : ethers.constants.Zero,
    },
    enabled: !!quote, // NOTE: here we are only enabling when the async call is ready!!
  });

  if (inputAmount === '*' || inputAmount === '{amount}')
    return (
      <TextResponse text="Please edit your query with an amount you wish to trade on Uniswap." />
    );
  if (!tokenOutSymbol)
    return <TextResponse text={`Please enter a valid token to trade on Uniswap`} />;

  return (
    <ConnectFirst>
      <HeaderResponse
        text="Swap with uniswap"
        projectName="uniswap"
        altUrl={`https://app.uniswap.org/#/swap`}
      />
      <ResponseRow>
        <DoubleLineResponse
          tokenSymbol={tokenInSymbol}
          tokenValueInUsd={cleanValue(
            calcPrice(quoteUSDC?.humanReadableAmount, input.formatted),
            2
          )}
          amount={input.formatted}
          amountValueInUsd={cleanValue(quoteUSDC?.humanReadableAmount, 2)}
        />
        <IconResponse icon="forward" />
        <DoubleLineResponse
          tokenSymbol={tokenOutSymbol}
          tokenValueInUsd={cleanValue(tokenOutUSDRate?.humanReadableAmount, 2)}
          amount={cleanValue(amountOut.formatted, 2)}
          amountValueInUsd={cleanValue(calcUSDValue(amountOut.formatted), 2)}
        />
      </ResponseRow>
      <ListResponse
        title="Breakdown"
        data={[
          ['Slippage', `${slippage}%`],
          ['Minimum swap', amountOutMinimum_],
          ['Route', `${tokenInSymbol}-${tokenOutSymbol}`],
        ]}
        collapsible
      />
      <ActionResponse
        label={`Swap ${input.formatted} ${tokenInSymbol || ''} for ${cleanValue(
          quote?.humanReadableAmount,
          2
        )} ${tokenOutSymbol}`}
        approvalParams={approval}
        txParams={undefined}
        sendParams={config.request}
      />
    </ConnectFirst>
  );
};

export default Uniswap;

import { useEffect, useMemo, useState } from 'react';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { TransactionRequestBase, formatUnits, parseUnits } from 'viem';
import { Address, UsePrepareContractWriteConfig, useAccount, usePublicClient } from 'wagmi';
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
import useChainId from '@/hooks/useChainId';
import useInput from '@/hooks/useInput';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import { ConnectFirst } from '../helpers/ConnectFirst';
import SwapRouter02Abi from './SwapRouter02';
import useUniswapQuote from './useUniswapQuote';

interface UniswapProps {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  inputAmount: string;
  slippage: string;
  transactionKeyword: 'BUYAMOUNT' | 'SELLAMOUNT';
}

const Uniswap = ({
  tokenInSymbol,
  tokenOutSymbol,
  inputAmount,
  slippage,
  transactionKeyword,
}: UniswapProps) => {
  const chainId = useChainId();
  const publicClient = usePublicClient();
  const isBuying = transactionKeyword === 'BUYAMOUNT';

  const { address: recipient } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const { data: tokenInChecked } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const { data: tokenOutChecked } = useToken(tokenOutIsETH ? 'WETH' : tokenOutSymbol);
  const input = useInput(inputAmount, tokenInChecked?.symbol!);

  const slippage_ = +slippage || 0.5; // in percentage terms
  const getSlippageAdjustedAmount = (amount: bigint) =>
    (amount * BigInt(10000 - slippage_ * 100)) / BigInt(10000);

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

  const [amountOut, setAmountOut] = useState<bigint>();
  const [amountOut_, setAmountOut_] = useState<string>();
  const [amountOutMinimum, setAmountOutMinimum] = useState<bigint>();
  const [amountOutMinimum_, setAmountOutMinimum_] = useState<string>();

  const [txParams, setTxParams] = useState<UsePrepareContractWriteConfig>();
  console.log('🦄 ~ file: Uniswap.tsx:70 ~ Uniswap ~ txParams:', txParams);

  useEffect(() => {
    if (!quote) {
      console.log(`No quote yet for ${tokenInSymbol}-${tokenOutSymbol}`);
      return;
    }
    const quoteValue = quote.value.toExact();
    if (!tokenOutChecked) {
      console.error('No tokenOutChecked');
      return;
    }
    const { decimals } = tokenOutChecked;
    const parsed = parseUnits(quoteValue, decimals);
    setAmountOut(parsed);
    setAmountOut_(quoteValue);

    const slippeageAdjustedAmount = getSlippageAdjustedAmount(parsed);
    setAmountOutMinimum(slippeageAdjustedAmount);
    setAmountOutMinimum_(formatUnits(slippeageAdjustedAmount, decimals));
  }, [quote, tokenInSymbol, tokenOutChecked, tokenOutSymbol]);

  const calcPrice = (quote: string | undefined, amount: string | undefined) =>
    !quote || !amount ? undefined : cleanValue((+quote / +amount).toString(), 2);

  const calcUSDValue = (amount: string | undefined) =>
    !tokenOutUSDRate?.humanReadableAmount || !amount
      ? undefined
      : cleanValue((+amount * +tokenOutUSDRate.humanReadableAmount).toString(), 2);

  const approval = useMemo<ApprovalBasicParams | undefined>(() => {
    if (!tokenIn) {
      console.error('No tokenIn');
      return;
    }

    if (!input?.value) {
      console.error('No input');
      return;
    }

    return {
      tokenAddress: tokenIn.address,
      approvalAmount: input.value,
      spender: SWAP_ROUTER_02_ADDRESSES(chainId) as Address,
      skipApproval: tokenInIsETH,
    };
  }, [chainId, input?.value, tokenIn, tokenInIsETH]);

  // args for func
  const args = useMemo(() => {
    if (!tokenInChecked) {
      console.error('No tokenInChecked');
      return;
    }
    if (!tokenOutChecked) {
      console.error('No tokenOutChecked');
      return;
    }
    if (!recipient) {
      console.error('No recipient');
      return;
    }
    if (!input?.value) {
      console.error('No input');
      return;
    }

    if (!amountOutMinimum) {
      console.error('No amountOutMinimum, quote is probably loading');
      return;
    }

    return {
      tokenIn: tokenInChecked.address,
      tokenOut: tokenOutChecked.address,
      fee: 3000,
      recipient,
      amountIn: input.value,
      amountOutMinimum,
      sqrtPriceLimitX96: BigInt(0),
    };
  }, [amountOutMinimum, input?.value, recipient, tokenInChecked, tokenOutChecked]);

  useEffect(() => {
    if (!args) return console.error('No args');

    (async () => {
      const res = await publicClient.simulateContract({
        address: SWAP_ROUTER_02_ADDRESSES(chainId) as Address,
        abi: SwapRouter02Abi,
        functionName: 'exactInputSingle',
        args: [args],
        value: tokenInIsETH ? input?.value : BigInt(0),
      });

      return setTxParams(res.request);
    })();
  }, [args, chainId, input?.value, publicClient, tokenInIsETH]);

  const label = useMemo(() => {
    if (!input) {
      console.error('No input');
      return;
    }
    if (!tokenIn) {
      console.error('No tokenIn');
      return;
    }
    if (!tokenOutChecked) {
      console.error('No tokenOut');
      return;
    }
    if (!amountOut) {
      console.error('No amountOut');
      return;
    }

    return `Swap ${input.formatted} ${tokenIn.symbol} for ${cleanValue(amountOut_, 2)} ${
      tokenOutChecked.symbol
    }`;
  }, [amountOut, amountOut_, input, tokenIn, tokenOutChecked]);

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
          tokenValueInUsd={
            !input
              ? undefined
              : cleanValue(calcPrice(quoteUSDC?.humanReadableAmount, input.formatted), 2)
          }
          amount={input ? input.formatted : undefined}
          amountValueInUsd={cleanValue(quoteUSDC?.humanReadableAmount, 2)}
        />
        <IconResponse icon="forward" />
        <DoubleLineResponse
          tokenSymbol={tokenOutSymbol}
          tokenValueInUsd={cleanValue(tokenOutUSDRate?.humanReadableAmount, 2)}
          amount={cleanValue(amountOut_, 2)}
          amountValueInUsd={cleanValue(calcUSDValue(amountOut_), 2)}
        />
      </ResponseRow>
      <ListResponse
        title="Breakdown"
        data={[
          ['Slippage', `${slippage_}%`],
          ['Minimum swap', cleanValue(amountOutMinimum_, 2)],
          ['Route', `${tokenInSymbol}-${tokenOutSymbol}`],
        ]}
        collapsible
      />
      <ActionResponse label={label} approvalParams={approval} txParams={txParams} />
    </ConnectFirst>
  );
};

export default Uniswap;

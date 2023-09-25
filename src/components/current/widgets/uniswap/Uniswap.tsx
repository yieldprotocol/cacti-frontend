import { useEffect, useMemo, useState } from 'react';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { UnsignedTransaction, formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { Address, useAccount, useContract } from 'wagmi';
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
}

const Uniswap = ({ tokenInSymbol, tokenOutSymbol, inputAmount, slippage }: UniswapProps) => {
  const chainId = useChainId();

  const { address: recipient } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const { data: tokenInChecked } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const { data: tokenOutChecked } = useToken(tokenOutIsETH ? 'WETH' : tokenOutSymbol);
  const input = useInput(inputAmount, tokenInChecked?.symbol!);
  // const slippage_ = +slippage; // in percentage terms
  const getSlippageAdjustedAmount = (amount: BigNumber) =>
    BigNumber.from(amount)
      .mul(10000 - +slippage * 100)
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

  const [amountOut, setAmountOut] = useState<BigNumber>();
  const [amountOut_, setAmountOut_] = useState<string>();
  const [amountOutMinimum, setAmountOutMinimum] = useState<BigNumber>();
  const [amountOutMinimum_, setAmountOutMinimum_] = useState<string>();

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

  // get swap router contract
  const contract = useContract({
    address: SWAP_ROUTER_02_ADDRESSES(chainId) as Address,
    abi: SwapRouter02Abi,
  });

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
      recipient: recipient,
      amountIn: input.value,
      amountOutMinimum,
      sqrtPriceLimitX96: BigNumber.from(0),
    };
  }, [amountOutMinimum, input, recipient, tokenInChecked, tokenOutChecked]);

  const value = useMemo(() => {
    if (!input) {
      console.error('No input');
      return;
    }
    return tokenInIsETH ? input.value : ethers.constants.Zero;
  }, [input, tokenInIsETH]);

  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  useEffect(() => {
    (async () => {
      if (!contract) {
        console.log('No contract yet');
        return;
      }

      if (!args) {
        console.log('No args yet');
        return;
      }

      if (!value) {
        console.log('No value yet');
        return;
      }

      const sendParams = await contract.populateTransaction.exactInputSingle(args, {
        value,
      });

      setSendParams(sendParams);
    })();
  }, [args, contract, value]);

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
          ['Slippage', `${slippage}%`],
          ['Minimum swap', cleanValue(amountOutMinimum_, 2)],
          ['Route', `${tokenInSymbol}-${tokenOutSymbol}`],
        ]}
        collapsible
      />
      <ActionResponse
        label={label}
        approvalParams={approval}
        txParams={undefined}
        sendParams={sendParams}
      />
    </ConnectFirst>
  );
};

export default Uniswap;

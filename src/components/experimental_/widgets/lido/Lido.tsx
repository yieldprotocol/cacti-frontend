import { useEffect, useState } from 'react';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import SwapRouter02Abi from '@/abi/SwapRouter02.json';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  ListResponse,
  TextResponse,
} from '@/components/cactiComponents';
import { DoubleLineResponse } from '@/components/cactiComponents/DoubleLineResponse';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import useTokenApproval from '@/hooks/useTokenApproval';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { cleanValue } from '@/utils';

interface LidoProps {
  inputAmount: BigNumber;
  tokenInSymbol: string;
  tokenOutSymbol: string;
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

const Lido = ({ inputAmount, tokenInSymbol, tokenOutSymbol }: LidoProps) => {
//   if (inputAmount === '*' || inputAmount === '{amount}')
//     return (
//       <TextResponse text="Please edit your query with an amount you wish to trade on Uniswap." />
//     );
  if (!tokenOutSymbol)
    return <TextResponse text={`Please enter a valid token to trade on Uniswap`} />;

  const chainId = useChainId();

  const { address: receiver } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const { data: tokenInChecked } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const { data: tokenOutChecked } = useToken(tokenOutIsETH ? 'WETH' : tokenOutSymbol);

  const inputCleaned = cleanValue(inputAmount.toString(), tokenInChecked?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenInChecked?.decimals);

  // token out quote for amount in
  const { isLoading: quoteIsLoading, data: quote } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: tokenOutSymbol,
    amount: inputCleaned,
  });

  // usdc RATE for token out (1 USDC)
  const { isLoading: quoteIsLoadingTokenOutUSDC, data: tokenOutUSDRate } = useUniswapQuote({
    baseTokenSymbol: tokenOutSymbol,
    quoteTokenSymbol: 'USDC',
    amount: undefined,
  });

  const calcPrice = (quote: string | undefined, amount: string | undefined) =>
    !quote || !amount ? undefined : cleanValue((+quote / +amount).toString(), 2);

  const calcUSDValue = (amount: string | undefined) =>
    !tokenOutUSDRate?.humanReadableAmount || !amount
      ? undefined
      : cleanValue((+amount * +tokenOutUSDRate.humanReadableAmount).toString(), 2);

  const amountOutMinimum = quote?.value
    ? ethers.utils.parseUnits(quote.value.toExact(), tokenOutChecked?.decimals).div('1000')
    : undefined;

  const amountOutMinimum_ = amountOutMinimum
    ? cleanValue(formatUnits(amountOutMinimum, tokenOutChecked?.decimals), 2)
    : undefined;

  const params: ExactInputSingleParams = {
    tokenIn: tokenInChecked?.address!,
    tokenOut: tokenOutChecked?.address!,
    fee: BigNumber.from(3000),
    recipient: receiver!,
    deadline: BigNumber.from(0),
    amountIn: amountIn,
    amountOutMinimum: amountOutMinimum!,
    sqrtPriceLimitX96: BigNumber.from(0),
  };

  const tx = {
    address: SWAP_ROUTER_02_ADDRESSES(chainId),
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
    overrides: {
      value: tokenInIsETH ? amountIn : 0,
    },
  };

  return (
    <>
      <HeaderResponse text="Deposit ETH in Lido" projectName="lido" />
      <ResponseRow>
        <DoubleLineResponse
          tokenSymbol="ETH"
          tokenValueInUsd={cleanValue(calcPrice(quoteUSDC?.humanReadableAmount, inputCleaned), 2)}
          amount={inputCleaned}
          amountValueInUsd={cleanValue(quoteUSDC?.humanReadableAmount, 2)}
        />
        <IconResponse icon="forward" />
        <DoubleLineResponse
          tokenSymbol="stETH"
          tokenValueInUsd={cleanValue(tokenOutUSDRate?.humanReadableAmount, 2)}
          amount={cleanValue(quoteTokenOut, 2)}
          amountValueInUsd={cleanValue(calcUSDValue(quoteTokenOut), 2)}
        />
      </ResponseRow>
      <ActionResponse
        label={`Deposit ${inputCleaned || ''} ${tokenInSymbol || ''} on Lido`}
        txParams={tx}
        approvalParams={approval}
        // stepper
        // disabled={true}
      />
    </>
  );
};

export default Lido;

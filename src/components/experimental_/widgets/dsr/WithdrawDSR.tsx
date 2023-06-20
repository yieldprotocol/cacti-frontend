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

interface WithdrawDSRProps {
  withdrawAmount: string;
}

interface WithdrawDSRParams {
  amountOut: BigNumber;
}

// SavingsDAI: https://etherscan.io/address/0x83F20F44975D03b1b09e64809B757c47f942BEeA#code
// TODO: Should I export the WithdrawDSR function?
export const WithdrawDSR = ({ withdrawAmount }: WithdrawDSRProps) => {
  if (withdrawAmount === '*' || withdrawAmount === '{amount}')
    return (
      <TextResponse text="Please edit your query with an amount you wish to withdraw in the DSR." />
    );

  const chainId = useChainId();

  const { address: receiver } = useAccount();

  // Here we use SavingsDAI as the tokenIn and DAI as tokenOut
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

  // formatted amount out quote value
  const quoteTokenOut = quote?.value?.toExact();

  // usdc quote for amount in
  const { isLoading: quoteIsLoadingUSDC, data: quoteUSDC } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: 'USDC',
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

  const params: WithdrawDSRParams = {
    source: receiver!, // This should be just the active account
    amountOut: amountOut,
  };

  // The DAI contract accepts DAI-like signatures
  const approval = {
    address: tokenIn?.address as `0x${string}`,
    amount: amountIn, // This needs to be calculated with `withdrawPreview`or `convertToShares`, both of them accounting for some slippage.
    spender: SWAP_ROUTER_02_ADDRESSES(chainId),
  };

  const tx = {
    address: SWAP_ROUTER_02_ADDRESSES(chainId),
    abi: SavingsDAIAbi,
    functionName: 'burn',
    args: [params],
  };

  return (
    <>
      <HeaderResponse text="Withdraw from the MakerDAO DSR" projectName="dsr" />
      <ResponseRow>
        <DoubleLineResponse
          tokenSymbol={tokenInSymbol}
          tokenValueInUsd={cleanValue(calcPrice(quoteUSDC?.humanReadableAmount, inputCleaned), 2)}
          amount={inputCleaned}
          amountValueInUsd={cleanValue(quoteUSDC?.humanReadableAmount, 2)}
        />
        <IconResponse icon="forward" />
        <DoubleLineResponse
          tokenSymbol={tokenOutSymbol}
          tokenValueInUsd={cleanValue(tokenOutUSDRate?.humanReadableAmount, 2)}
          amount={cleanValue(quoteTokenOut, 2)}
          amountValueInUsd={cleanValue(calcUSDValue(quoteTokenOut), 2)}
        />
      </ResponseRow>
      <ListResponse
        title="Breakdown"
        data={[
          ['Slippage', '0.5%'],
          ['Minimum swap', amountOutMinimum_],
          ['Gas Fees', '0.32'],
          ['Route', `${tokenInSymbol}-${tokenOutSymbol}`],
        ]}
        collapsible
      />
      <ActionResponse
        label={`Swap ${inputCleaned || ''} ${tokenInSymbol || ''} on Uniswap`}
        txParams={tx}
        approvalParams={approval}
        // disabled={true}
      />
    </>
  );
};

export default WithdrawDSR;

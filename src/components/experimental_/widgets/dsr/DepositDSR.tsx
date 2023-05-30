import { useEffect, useState } from 'react';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import ERC4626Abi from '@/abi/erc4626ABI.json';
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

interface DepositDSRProps {
  depositAmount: string;
}

interface DepositDSRParams {
  receiver: string;
  amountIn: BigNumber;
}

// SavingsDAI: https://etherscan.io/address/0x83F20F44975D03b1b09e64809B757c47f942BEeA#code
export const DepositDSR = ({ depositAmount }: DepositDSRProps) => {
  if (depositAmount === '*' || depositAmount === '{amount}')
    return (
      <TextResponse text="Please edit your query with an amount you wish to deposit in the DSR." />
    );

  const chainId = useChainId();

  const { address: receiver } = useAccount();

  // Here we use DAI as the tokenIn and SavingsDAI as tokenOut
  const tokenInSymbol = 'DAI';
  const tokenOutSymbol = 'sDAI';
  const { data: tokenIn } = useToken(tokenInSymbol);
  const { data: tokenOut } = useToken(tokenOutSymbol);

  console.log(tokenIn)
  const inputCleaned = cleanValue(depositAmount.toString(), tokenIn?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenIn?.decimals);

//  // token out quote for amount in
//  const { isLoading: quoteIsLoading, data: quote } = useERC4626Quote({
//    baseTokenSymbol: tokenInSymbol,
//    quoteTokenSymbol: tokenOutSymbol,
//    amount: inputCleaned,
//  });
//
//  // formatted amount out quote value
//  const quoteTokenOut = quote?.value?.toExact();
//
//  // usdc quote for amount in
//  const { isLoading: quoteIsLoadingUSDC, data: quoteUSDC } = useUniswapQuote({
//    baseTokenSymbol: tokenInSymbol,
//    quoteTokenSymbol: 'USDC',
//    amount: inputCleaned,
//  });
//
//  // usdc RATE for token out (1 USDC)
//  const { isLoading: quoteIsLoadingTokenOutUSDC, data: tokenOutUSDRate } = useUniswapQuote({
//    baseTokenSymbol: tokenOutSymbol,
//    quoteTokenSymbol: 'USDC',
//    amount: undefined,
//  });
//
//  const calcPrice = (quote: string | undefined, amount: string | undefined) =>
//    !quote || !amount ? undefined : cleanValue((+quote / +amount).toString(), 2);
//
//  const calcUSDValue = (amount: string | undefined) =>
//    !tokenOutUSDRate?.humanReadableAmount || !amount
//      ? undefined
//      : cleanValue((+amount * +tokenOutUSDRate.humanReadableAmount).toString(), 2);
//
//  const amountOutMinimum = quote?.value
//    ? ethers.utils.parseUnits(quote.value.toExact(), tokenOut?.decimals).div('1000')
//    : undefined;
//
//  const amountOutMinimum_ = amountOutMinimum
//    ? cleanValue(formatUnits(amountOutMinimum, tokenOut?.decimals), 2)
//    : undefined;

  const params: DepositDSRParams = {
    receiver: receiver!,
    amountIn: amountIn,
  };

  // Use DAI signatures for approval
  const approval = {
    address: tokenIn?.address as `0x${string}`,
    amount: amountIn,
    spender: tokenOut?.address as `0x${string}`, // This is the SavingsDAI contract address
  };

  const tx = {
    address: tokenOut?.address as `0x${string}`,
    abi: ERC4626Abi,
    functionName: 'mint',
    args: [params],
    overrides: {
      value: 0,
    },
  };

  return (
    <>
      <HeaderResponse text="Deposit in the MakerDAO DSR" projectName="dsr" />

      <ActionResponse
        label={`Deposit ${inputCleaned || ''} ${tokenInSymbol || ''} on MakerDAO DSR`}
        txParams={tx}
        approvalParams={approval}
        // disabled={true}
      />
    </>
  );
};

export default DepositDSR;

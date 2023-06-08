import { useMemo } from 'react';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { useAccount } from 'wagmi';
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
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { cleanValue } from '@/utils';
import { ConnectFirst } from '../helpers/ConnectFirst';

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

  const params: ExactInputSingleParams = useMemo(
    () => ({
      tokenIn: tokenInChecked?.address!,
      tokenOut: tokenOutChecked?.address!,
      fee: BigNumber.from(3000),
      recipient: receiver!,
      deadline: BigNumber.from(0),
      amountIn: amountIn,
      amountOutMinimum: amountOutMinimum!,
      sqrtPriceLimitX96: BigNumber.from(0),
    }),
    [amountIn, amountOutMinimum, receiver, tokenInChecked?.address, tokenOutChecked?.address]
  );

  const approval = useMemo(
    (): ApprovalBasicParams => ({
      address: tokenInIsETH ? ethers.constants.AddressZero : (tokenIn?.address as `0x${string}`),
      approvalAmount: amountIn,
      spender: SWAP_ROUTER_02_ADDRESSES(chainId),
    }),
    [amountIn, chainId, tokenIn?.address, tokenInIsETH]
  );

  const tx = useMemo(
    (): TxBasicParams => ({
      address: SWAP_ROUTER_02_ADDRESSES(chainId),
      abi: SwapRouter02Abi,
      functionName: 'exactInputSingle',
      args: [params],
      overrides: {
        value: tokenInIsETH ? amountIn : 0,
      },
    }),
    [amountIn, chainId, params, tokenInIsETH]
  );

  if (inputAmount === '*' || inputAmount === '{amount}')
    return (
      <TextResponse text="Please edit your query with an amount you wish to trade on Uniswap." />
    );
  if (!tokenOutSymbol)
    return <TextResponse text={`Please enter a valid token to trade on Uniswap`} />;

  return (
    <ConnectFirst>
      <HeaderResponse text="Swap with uniswap" projectName="uniswap" />
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
        // stepper
        // disabled={true}
      />
    </ConnectFirst>
  );
};

export default Uniswap;

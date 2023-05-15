import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import SwapRouter02Abi from '@/abi/SwapRouter02.json';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  ListResponse,
  SingleLineResponse,
} from '@/components/cw3Components';
import { ResponseRow } from '@/components/cw3Components/helpers/cw3Layout';
import useChainId from '@/hooks/useChainId';
import useSubmitTx from '@/hooks/useSubmitTx';
import useToken from '@/hooks/useToken';
import useTokenApproval from '@/hooks/useTokenApproval';
import useUniswapQuote from '@/hooks/useUniswapQuote';
import { cleanValue } from '@/utils';

interface UniswapProps {
  tokenInSymbol: string;
  tokenOutSymbol: string;
  amountIn: string;
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

const Uniswap = ({ tokenInSymbol, tokenOutSymbol, amountIn }: UniswapProps) => {
  const chainId = useChainId();
  const { address: receiver } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const { data: tokenInChecked } = useToken(tokenInIsETH ? 'WETH' : tokenInSymbol);
  const { data: tokenOutChecked } = useToken(tokenOutIsETH ? 'WETH' : tokenOutSymbol);

  // const amount
  const amountInToUse = BigNumber.from(cleanValue(amountIn.toString(), tokenInChecked?.decimals));
  const amountIn_ = formatUnits(amountInToUse, tokenInChecked?.decimals);

  // token out quote for amount in
  const { isLoading: quoteIsLoading, data: quote } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: tokenOutSymbol,
    amount: amountIn_,
  });

  // formatted amount out quote value
  const amountOut_ = quote?.value?.toExact();

  // usdc quote for amount in
  const { isLoading: quoteIsLoadingUSDC, data: quoteUSDC } = useUniswapQuote({
    baseTokenSymbol: tokenInSymbol,
    quoteTokenSymbol: 'USDC',
    amount: amountIn_,
  });

  // usdc quote for token out
  const { isLoading: quoteIsLoadingTokenOutUSDC, data: quoteTokenOutUSDC } = useUniswapQuote({
    baseTokenSymbol: tokenOutSymbol,
    quoteTokenSymbol: 'USDC',
    amount: amountOut_,
  });

  const calcPrice = (quote: string | undefined, amount: string | undefined) =>
    !quote || !amount ? undefined : cleanValue((+quote / +amount).toString(), 2);

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
    amountIn: amountInToUse,
    amountOutMinimum: amountOutMinimum!,
    sqrtPriceLimitX96: BigNumber.from(0),
  };

  const { config: swapConfig } = usePrepareContractWrite({
    address: SWAP_ROUTER_02_ADDRESSES(chainId),
    abi: SwapRouter02Abi,
    functionName: 'exactInputSingle',
    args: [params],
    overrides: {
      value: tokenInIsETH ? amountInToUse : 0,
    },
  });

  const { hasBalance, hasAllowance } = useTokenApproval(
    tokenIn?.address as `0x${string}`,
    amountInToUse,
    SWAP_ROUTER_02_ADDRESSES(chainId)
  );

  const { isSuccess, isError, isLoading, submitTx, isPrepared, error, hash, isPendingConfirm } =
    useSubmitTx(swapConfig.request);
  //   {"componentType":"HeaderResponse", "props": {"text":"Swap with Uniswap", "projectName": "uniswap" }},
  //   [
  //     {"componentType":"SingleLineResponse", "props": {"tokenSymbol":"${tokenInSymbol}", "value":"${amountInStrRaw}"}},
  //     {"componentType":"IconResponse", "props": {"icon":"forward"}},
  //     {"componentType":"SingleLineResponse", "props": {"tokenSymbol":"${tokenOutSymbol}", "value":"${amountOut}"}}
  //   ],
  //   {"componentType":"ListResponse", "props": {"data":[["Slippage","${slippage}" ],["Gas Fees","${gasFees}" ],["Route","${tokenInSymbol}-${tokenOutSymbol}"]], "title":"Breakdown"}},
  //   {"componentType":"ActionResponse", "props": {"label":"Swap", "state":"disabled"}}

  return (<>
      <HeaderResponse text="Swap with uniswap" projectName="uniswap" />
      <ResponseRow>
        <SingleLineResponse tokenSymbol={tokenInSymbol} value={amountIn} />
        <IconResponse icon="forward" />
        <SingleLineResponse tokenSymbol={tokenOutSymbol} value={amountOut_} />
      </ResponseRow>
      <ListResponse
        title="Breakdown"
        data={[
          ['Slippage', '0.5%'],
          ['Gas Fees', '0.32'],
          ['Route', `${tokenInSymbol}-${tokenOutSymbol}`],
        ]}
      />
      <ActionResponse label="Swap" state="disabled" />
    </>)
};

export default Uniswap;

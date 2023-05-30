import { useEffect, useState } from 'react';
import { SWAP_ROUTER_02_ADDRESSES } from '@uniswap/smart-order-router';
import { BigNumber, ethers } from 'ethers';
import { formatUnits, getAddress, parseUnits } from 'ethers/lib/utils.js';
import { getToken } from 'next-auth/jwt';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import stethAbi from '@/abi/steth.json';
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

const Lido = ({ inputAmount }: LidoProps) => {
  const tokenInSymbol = 'ETH';
  const tokenOutSymbol = 'stETH';

  const chainId = useChainId();

  const { address: receiver } = useAccount();
  const { data: tokenIn, isETH: tokenInIsETH } = useToken(tokenInSymbol);
  const { isETH: tokenOutIsETH } = useToken(tokenOutSymbol);
  const { data: tokenInChecked } = useToken(tokenInIsETH ? 'ETH' : tokenInSymbol);
  const { data: tokenOutChecked } = useToken(tokenOutIsETH ? 'WETH' : tokenOutSymbol);

  const inputCleaned = cleanValue(inputAmount.toString(), tokenInChecked?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenInChecked?.decimals);
console.log()
  const tx = {
    address: useToken(tokenOutSymbol).data?.address as `0x${string}`,
    abi: stethAbi,
    functionName: 'submit',
    args: ['0x0000000000000000000000000000000000000000'],
    overrides: {
      value: tokenInIsETH ? inputAmount : 0,
    },
  };

  return (
    <>
      <HeaderResponse text="Deposit ETH in Lido" />
      <ResponseRow>
        <DoubleLineResponse tokenSymbol="ETH" amount={inputCleaned} />
        <IconResponse icon="forward" />
        <DoubleLineResponse tokenSymbol="stETH" amount={cleanValue(inputCleaned)} />
      </ResponseRow>
      <ActionResponse
        label={`Deposit ${inputCleaned || ''} ${tokenInSymbol || ''} on Lido`}
        txParams={tx}
        // stepper
        // disabled={true}
      />
    </>
  );
};

export default Lido;

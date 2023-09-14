import { useMemo } from 'react';
import { parseUnits } from 'viem';
import { UsePrepareContractWriteConfig, useAccount } from 'wagmi';
import ERC4626Abi from '@/abi/erc4626ABI';
import { ActionResponse, HeaderResponse, TextResponse } from '@/components/cactiComponents';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface RedeemDSRProps {
  shares: string;
  //   receiver: string;
  //   owner: string;
}

interface RedeemDSRParams {
  receiver: string;
  owner: string;
  assets: string;
}

// SavingsDAI: https://etherscan.io/address/0x83F20F44975D03b1b09e64809B757c47f942BEeA#code
export const RedeemDSR = ({ shares }: RedeemDSRProps) => {
  const { address: receiver } = useAccount();

  // Here we use DAI as the tokenIn and SavingsDAI as tokenOut
  const tokenInSymbol = 'sDAI';
  const tokenOutSymbol = 'DAI';
  const { data: tokenIn } = useToken(tokenInSymbol);
  const { data: tokenOut } = useToken(tokenOutSymbol);

  const inputCleaned = cleanValue(shares.toString(), tokenIn?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenIn?.decimals!);

  const params = useMemo(
    (): RedeemDSRParams => ({
      assets: amountIn.toString(),
      receiver: receiver!,
      owner: receiver!,
    }),
    [amountIn, receiver]
  );

  // Use DAI signatures for approval
  const approval = useMemo(
    (): ApprovalBasicParams => ({
      tokenAddress: tokenIn?.address!,
      approvalAmount: amountIn,
      spender: tokenOut?.address as `0x${string}`,
    }),
    [amountIn, tokenIn, tokenOut]
  );

  const tx = useMemo(
    (): UsePrepareContractWriteConfig => ({
      address: tokenIn?.address as `0x${string}`,
      abi: ERC4626Abi,
      functionName: 'redeem',
      args: Object.values(params),
    }),
    [params, tokenIn]
  );

  if (shares === '*' || shares === '{amount}')
    return (
      <TextResponse text="Please edit your query with an amount you wish to deposit in the DSR." />
    );

  return (
    <ConnectFirst>
      <HeaderResponse
        text={`Redeem ${inputCleaned} ${tokenInSymbol} in the MakerDAO DSR`}
        projectName="dsr"
      />
      <ActionResponse
        label={`Redeem ${inputCleaned || ''} ${tokenInSymbol || ''} on MakerDAO DSR`}
        txParams={tx}
        approvalParams={approval}
      />
    </ConnectFirst>
  );
};

export default RedeemDSR;

import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import { useAccount } from 'wagmi';
import ERC4626Abi from '@/abi/erc4626ABI.json';
import { ActionResponse, HeaderResponse, TextResponse } from '@/components/cactiComponents';
import { ApprovalBasicParams } from '@/components/cactiComponents/hooks/useApproval';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface WithdrawVaultProps {
  amount: string;
  withdrawToken: string;
  vault: string;
}

interface WithdrawVaultParams {
  receiver: string;
  assets: string;
}

function getVaultAddress(vaultName: string, tokenIn: string): string {
  switch (vaultName) {
    case 'savings':
      return '0x83F20F44975D03b1b09e64809B757c47f942BEeA';
    case 'yearn':
      switch (tokenIn) {
        case 'DAI':
          return '0xdA816459F1AB5631232FE5e97a05BBBb94970c95';
        case 'yearnUSDC':
          return '0xa354F35829Ae975e850e23e9615b11Da1B3dC4DE';
        case 'yearnWETH':
          return '0xa258C4606Ca8206D8aA700cE2143D7db854D168c';
      }
    default:
      return '';
  }
}

// SavingsDAI: https://etherscan.io/address/0x83F20F44975D03b1b09e64809B757c47f942BEeA#code
export const WithdrawVault = ({ withdrawToken, amount, vault }: WithdrawVaultProps) => {
  const chainId = useChainId();
  const { address: receiver } = useAccount();

  // Here we use DAI as the tokenIn
  const tokenInSymbol = withdrawToken;
  const tokenOutSymbol = vault;
  const { data: tokenIn } = useToken(tokenInSymbol);
  const { data: tokenOut } = useToken(tokenOutSymbol);

  //TODO: Get the vault address

  const inputCleaned = cleanValue(amount.toString(), tokenIn?.decimals);
  const amountIn = parseUnits(inputCleaned!, tokenIn?.decimals);

  const params: WithdrawVaultParams = {
    assets: amountIn.toString(),
    receiver: receiver!,
  };

  const vaultAddresss = getVaultAddress(vault, withdrawToken) as `0x${string}`;

  // Use DAI signatures for approval
  const approval = useMemo(
    (): ApprovalBasicParams => ({
      tokenAddress: tokenIn?.address!,
      approvalAmount: amountIn,
      spender: vaultAddresss,
    }),
    [amountIn, chainId, tokenIn]
  );

  const tx = useMemo(
    (): TxBasicParams => ({
      address: vaultAddresss,
      abi: ERC4626Abi,
      functionName: 'withdraw',
      args: Object.values(params),
    }),
    [amountIn, chainId, params, tokenOut?.address]
  );

  if (amount === '*' || amount === '{amount}')
    return <TextResponse text="Please edit your query with an amount you wish to withdraw" />;

  return (
    <ConnectFirst>
      <HeaderResponse
        text={`Withdraw ${inputCleaned} ${tokenInSymbol} in the ${vault} vault`}
        projectName="dsr"
      />
      <ActionResponse
        label={`Withdraw ${inputCleaned || ''} ${tokenInSymbol || ''} on vault`}
        txParams={tx}
        approvalParams={approval}
        // disabled={true}
      />
    </ConnectFirst>
  );
};

export default WithdrawVault;

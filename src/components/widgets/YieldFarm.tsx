import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import {
  UsePrepareContractWriteConfig,
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { CompoundV2USDCAbi } from '@/abi/CompoundV2USDC';
import ApproveTokens from '@/components/ApproveTokens';
import { Button } from '@/components/Button';
import { TxStatus } from '@/components/TxStatus';
import { WidgetError } from '@/components/widgets/helpers';
import { Project, Token } from '@/types';

// NOTE: For Demo, only support depositing USDC into Compound
// Compound-V2 USDC cToken address
const compoundUSDCAddress = '0x39AA39c021dfbaE8faC545936693aC917d5E7563';
const supportedProjects = {
  compound: {
    getWriteConfig: (token: Token, amount: BigNumber) => {
      return {
        address: compoundUSDCAddress,
        abi: CompoundV2USDCAbi,
        functionName: 'mint',
        args: [amount],
      };
    },
  },
};
interface YieldFarmProps {
  project: Project;
  network: string;
  token: Token;
  amount: BigNumber;
}

export const YieldFarm = ({ project, network, token, amount }: YieldFarmProps) => {
  const { address: walletAddress } = useAccount();
  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [walletAddress],
  });

  // Get allowance amount
  const { data: allowanceAmount } = useContractRead({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [walletAddress, compoundUSDCAddress],
  });

  useEffect(() => {
    setHasBalance(balance && BigNumber.from(balance).gte(amount));
    setHasAllowance(allowanceAmount && BigNumber.from(allowanceAmount).gte(amount));
  }, [balance, allowanceAmount, amount, isApprovalSuccess, walletAddress]);

  // For Demo, only support depositing USDC into Compound
  if (project.id !== 'compound' || token.symbol !== 'USDC') {
    return <p>Unable to deposit, project/token not supported</p>;
  }

  if (!hasBalance) {
    return <p>Insufficient balance</p>;
  }

  return (
    <>
      {!hasAllowance && !isApprovalSuccess && (
        <div className="flex w-[100%] justify-end">
          <div>
            <ApproveTokens
              {...{
                token,
                amount,
                setIsApprovalSuccess,
                spenderAddress: supportedProjects[project.id].getWriteConfig(token, amount)
                  .address as `0x${string}`,
              }}
            />
          </div>
        </div>
      )}
      {(hasAllowance || isApprovalSuccess) && <DepositTokens {...{ project, token, amount }} />}
    </>
  );
};

const DepositTokens = ({
  project,
  token,
  amount,
}: {
  project: Project;
  token: Token;
  amount: BigNumber;
}) => {
  const prepareContractWriteConfig = supportedProjects[project.id].getWriteConfig(token, amount);

  const { config: depositConfig, error } = usePrepareContractWrite(prepareContractWriteConfig);
  const err: Error & { reason?: string } = error;

  const { write: depositWrite, data, isSuccess } = useContractWrite(depositConfig);

  return (
    <>
      <div className="flex w-[100%] justify-end">
        {!isSuccess && (
          <div>
            <Button disabled={!depositWrite} onClick={() => depositWrite?.()}>
              Send
            </Button>
          </div>
        )}
        {isSuccess && <TxStatus hash={data?.hash} />}
        {err && (
          <WidgetError>Error simulating transaction: {err.reason || err.message}</WidgetError>
        )}
      </div>
    </>
  );
};

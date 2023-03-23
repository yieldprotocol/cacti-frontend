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
import { Button } from '@/components/Button';
import { TxStatus } from '@/components/TxStatus';
import { WidgetError } from '@/components/widgets/helpers';
import { Project, Token } from '@/types';
import CompoundV2USDCAbi from '../../abi/CompoundV2USDC.json';

// NOTE: For Demo, only support depositing USDC into Compound
// Compound-V2 USDC cToken address
const compoundUSDCAddress = '0x39AA39c021dfbaE8faC545936693aC917d5E7563';
const supportedProjects: {
  [projectId: string]: {
    getWriteConfig: (token: Token, amount: BigNumber) => UsePrepareContractWriteConfig;
  };
} = {
  compound: {
    getWriteConfig: (token: Token, amount: BigNumber) => {
      return {
        address: compoundUSDCAddress,
        abi: CompoundV2USDCAbi as any,
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
    <div>
      {!hasAllowance && !isApprovalSuccess && (
        <ApproveTokens {...{ project, token, amount, setIsApprovalSuccess }} />
      )}
      {(hasAllowance || isApprovalSuccess) && <DepositTokens {...{ project, token, amount }} />}
    </div>
  );
};

const ApproveTokens = ({
  project,
  token,
  amount,
  setIsApprovalSuccess,
}: Pick<YieldFarmProps, 'project' | 'token' | 'amount'> & {
  setIsApprovalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Get approval ready
  const { config: tokenConfig } = usePrepareContractWrite({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'approve',
    args: [supportedProjects[project.id].getWriteConfig(token, amount).address, amount],
  });
  const { write: tokenWrite, data } = useContractWrite(tokenConfig);
  const { isLoading, isSuccess: isApprovalSuccess } = useWaitForTransaction({ hash: data?.hash });

  useEffect(() => {
    setIsApprovalSuccess(isApprovalSuccess);
  }, [setIsApprovalSuccess, isApprovalSuccess]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center">
        <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
          {isLoading ? 'Pending...' : 'Approve'}
        </Button>
      </div>
      <div className="flex justify-center text-xs">
        First, approve {project.name} for {formatUnits(amount.toString(), token.decimals)}{' '}
        {token.symbol}
      </div>
      {!isLoading && isApprovalSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
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

  const { write: depositWrite, data, isSuccess } = useContractWrite(depositConfig as any);

  return (
    <>
      <div>
        {!isSuccess && (
          <Button disabled={!depositWrite} onClick={() => depositWrite?.()}>
            Send
          </Button>
        )}
        {isSuccess && <TxStatus hash={data?.hash} />}
        {err && (
          <WidgetError>Error simulating transaction: {err.reason || err.message}</WidgetError>
        )}
      </div>
    </>
  );
};

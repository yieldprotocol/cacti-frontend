import { useEffect, useState } from 'react';
import { parseUnits } from 'viem';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi';
import { CompoundV2USDCAbi } from '@/abi/CompoundV2USDC';
import { WidgetError } from '@/components/legacy/legacyWidgets/helpers';
import { Button } from '@/components/shared/Button';
import useToken from '@/hooks/useToken';
import { Project, Token } from '@/types';
import { findProjectByName } from '@/utils';
import ApproveTokens from '../legacyComponents/ApproveTokens';
import { TxStatus } from '../legacyComponents/TxStatus';
import { ActionPanel } from './helpers/ActionPanel';
import { ConnectFirst } from './helpers/ConnectFirst';

// NOTE: For Demo, only support depositing USDC into Compound
// Compound-V2 USDC cToken address
const compoundUSDCAddress = '0x39AA39c021dfbaE8faC545936693aC917d5E7563';
const supportedProjects = {
  compound: {
    getWriteConfig: (token: Token, amount: bigint) => {
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
  project: Project | undefined;
  network: string;
  token: Token;
  amount: bigint;
}

const YieldFarm = ({ project, network, token, amount }: YieldFarmProps) => {
  const { address: walletAddress } = useAccount();
  const [hasBalance, setHasBalance] = useState(false);
  const [hasAllowance, setHasAllowance] = useState(false);
  const [isApprovalSuccess, setIsApprovalSuccess] = useState(false);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [walletAddress!],
  });

  // Get allowance amount
  const { data: allowanceAmount } = useContractRead({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [walletAddress!, compoundUSDCAddress],
  });

  useEffect(() => {
    balance && setHasBalance(balance > amount);
    allowanceAmount && setHasAllowance(allowanceAmount >= amount);
  }, [balance, allowanceAmount, amount, isApprovalSuccess, walletAddress]);

  // For Demo, only support depositing USDC into Compound
  if (!project || project.id !== 'compound' || token.symbol !== 'USDC') {
    return <p> Unable to deposit, project/token not supported</p>;
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
  amount: bigint;
}) => {
  const prepareContractWriteConfig = (supportedProjects as any)[project.id].getWriteConfig(
    token,
    amount
  );

  const { config: depositConfig, error: err } = usePrepareContractWrite(prepareContractWriteConfig);

  // TODO fix types
  const { write: depositWrite, data, isSuccess } = useContractWrite(depositConfig as any);

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
        {isSuccess && <TxStatus hash={data?.hash!} />}
        {err && <WidgetError>Error simulating transaction: {err.message}</WidgetError>}
      </div>
    </>
  );
};

interface YieldFarmWidgetProps {
  inputString: string;
  projectName: string;
  network: string;
  tokenSymbol: string;
  amtString: string;
}

export const YieldFarmWidget = ({
  inputString,
  projectName,
  network,
  tokenSymbol,
  amtString,
}: YieldFarmWidgetProps) => {
  const { getToken } = useToken();
  const token = getToken(tokenSymbol);
  const amount = parseUnits(amtString, token?.decimals!);

  const project = findProjectByName(projectName);
  return (
    <ActionPanel
      header={`You are depositing ${amtString} ${tokenSymbol} into ${projectName}`}
      msg={inputString}
      key={inputString}
      gap="gap-3"
      centerTitle={true}
    >
      <ConnectFirst>
        <YieldFarm {...{ project, network, token: token!, amount }} />
      </ConnectFirst>
    </ActionPanel>
  );
};

import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils.js';
import { parseUnits } from 'ethers/lib/utils.js';
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
import ApproveTokens from '@/components/legacyUI/ApproveTokens';
import { Button } from '@/components/shared/Button';
import { TxStatus } from '@/components/legacyUI/TxStatus';
import { WidgetError } from '@/components/legacyUI/widgets/helpers';
import useToken from '@/hooks/useToken';
import { Project, Token } from '@/types';
import { findProjectByName } from '@/utils';
import { ActionPanel } from './helpers/ActionPanel';
import { ConnectFirst } from './helpers/ConnectFirst';

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
    balance && setHasBalance(BigNumber.from(balance).gte(amount));
    allowanceAmount && setHasAllowance(BigNumber.from(allowanceAmount).gte(amount));
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
  const amount = parseUnits(amtString, token?.decimals);

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

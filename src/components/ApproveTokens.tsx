import { useEffect, useState } from 'react';
import { BigNumber } from 'ethers';
import { useNetwork } from 'wagmi';
import { Button } from '@/components/Button';
import useTokenApproval from '@/hooks/useTokenApproval';
import { Token } from '@/types';

interface Props {
  tokenIn: Token;
  tokenOut: Token;
  amountIn: BigNumber;
}

const ApproveTokens = ({
  token,
  amount,
  spenderAddress,
  setIsApprovalSuccess,
}: {
  token: Token;
  amount: BigNumber;
  spenderAddress: `0x${string}`;
  setIsApprovalSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { chain } = useNetwork();
  // Get approval ready
  const { approvalWrite, isLoading, isSuccess, data } = useTokenApproval({
    address: token.address as `0x${string}`,
    amountIn: amount,
    spenderAddress,
  });
  useEffect(() => {
    setIsApprovalSuccess(isSuccess);
  }, [setIsApprovalSuccess, isSuccess]);

  return (
    <div className="w-[100%]">
      <div className="flex justify-end">
        <Button disabled={!approvalWrite} onClick={() => approvalWrite?.()}>
          {isLoading ? 'Pending...' : 'Approve'}
        </Button>
      </div>
    </div>
  );
};

export default ApproveTokens;

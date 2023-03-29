import { BigNumber } from 'ethers';
import { Button } from '@/components/Button';
import useTokenApproval from '@/hooks/useTokenApproval';
import { Token } from '@/types';

const ApproveTokens = ({
  token,
  amount,
  spenderAddress,
}: {
  token: Token;
  amount: BigNumber;
  spenderAddress: `0x${string}`;
}) => {
  // Get approval ready
  const { approve, isLoading, hasAllowance } = useTokenApproval({
    address: token.address as `0x${string}`,
    amount: amount,
    spenderAddress,
  });

  if (hasAllowance) return null;
  return (
    <div className="w-[100%]">
      <div className="flex justify-end">
        <Button disabled={!approve} onClick={approve}>
          {isLoading ? 'Pending...' : 'Approve'}
        </Button>
      </div>
    </div>
  );
};

export default ApproveTokens;

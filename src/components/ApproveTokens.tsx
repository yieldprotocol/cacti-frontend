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
  const { approve, txPending, hasAllowance, hasBalance, txError } = useTokenApproval(
    token.address as `0x${string}`,
    amount,
    spenderAddress
  );

  if (hasAllowance) return null;

  return (
    <div className="w-[100%]">
      <div className="flex justify-end">
        <Button
          disabled={!approve || txPending || !hasBalance || txError}
          onClick={approve}
          className={hasBalance ? '' : 'border border-red-500'}
        >
          {!hasBalance
            ? 'Insufficient balance'
            : txPending
            ? 'Approval pending...'
            : txError
            ? 'Approval error'
            : 'Approve'}
        </Button>
      </div>
    </div>
  );
};

export default ApproveTokens;

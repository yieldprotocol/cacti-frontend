import { BigNumber } from 'ethers';
import useTokenApproval from '@/hooks/useTokenApproval';
import { Token } from '@/types';
import SubmitButton from './widgets/swap/SubmitButton';

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
    <SubmitButton
      disabled={!approve || txPending || !hasBalance || txError}
      onClick={() => {
        console.log('approving');
        approve();
      }}
      label={
        !hasBalance
          ? 'Insufficient balance'
          : txPending
          ? 'Approval pending...'
          : txError
          ? 'Approval error'
          : `Approve ${token.symbol}`
      }
    />
  );
};

export default ApproveTokens;

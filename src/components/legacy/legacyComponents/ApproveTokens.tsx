import { BigNumber } from 'ethers';
import useTokenApproval from '@/hooks/useTokenApproval';
import { Token } from '@/types';
import SubmitButton from '../legacyWidgets/common/SubmitButton';

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
      isError={txError || !hasBalance}
      isLoading={txPending}
      disabled={!approve || txPending || !hasBalance || txError}
      onClick={approve}
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

import { UnsignedTransaction } from 'ethers';
import { Address, TransactionRequestBase } from 'viem';
import useEnsAvatar from '@/components/cactiComponents/hooks/useEnsAvatar';
import useEnsName from '@/components/cactiComponents/hooks/useEnsName';
import { ActionResponse, HeaderResponse } from '../../cactiComponents';
import { WidgetError } from '../widgets/helpers';
import { ConnectFirst } from '../widgets/helpers/ConnectFirst';

// NOTE: May need to deprecate this in favor of MultiStepContainer
interface SingleStepContainerProps {
  userRequestStatus: 'success' | 'error';
  tx: { from: string; to: string; value: string; data: string; gas: string } | null;
  errorMsg: string;
  parsedUserRequest: string;
  description: string;
}

export const SingleStepContainer = ({
  userRequestStatus,
  tx,
  errorMsg,
  description,
}: SingleStepContainerProps) => {
  const { refetch: refetchEnsName } = useEnsName();
  const { refetch: refetchEnsAvatar } = useEnsAvatar();

  if (userRequestStatus === 'error') {
    return <WidgetError>{errorMsg}</WidgetError>;
  }

  const unsignedTx: TransactionRequestBase = {
    from: tx?.from as Address,
    to: tx?.to as Address,
    data: tx?.data as Address,
    value: BigInt(tx?.value || 0),
    gas: BigInt(tx?.gas || 0),
  };

  return (
    <ConnectFirst>
      <HeaderResponse text={description} />
      <ActionResponse
        label={`Send Transaction`}
        sendParams={unsignedTx}
        txParams={undefined}
        approvalParams={undefined}
        onSuccess={() => {
          refetchEnsName();
          refetchEnsAvatar();
        }}
      />
    </ConnectFirst>
  );
};

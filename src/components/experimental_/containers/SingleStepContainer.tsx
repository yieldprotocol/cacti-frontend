import { UnsignedTransaction } from 'ethers';
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
  if (userRequestStatus === 'error') {
    return <WidgetError>{errorMsg}</WidgetError>;
  }

  const unsignedTx: UnsignedTransaction = {
    to: tx?.to,
    data: tx?.data,
    value: tx?.value,
    gasLimit: tx?.gas,
  };

  return (
    <ConnectFirst>
      <HeaderResponse text={description} />
      <ActionResponse
        label={`Send Transaction`}
        sendParams={unsignedTx}
        txParams={undefined}
        approvalParams={undefined}
      />
    </ConnectFirst>
  );
};
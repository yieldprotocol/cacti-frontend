import { useEffect } from 'react';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { UnsignedTransaction } from 'ethers';
import { useChatContext } from '@/contexts/ChatContext';
import { ActionResponse, HeaderResponse } from '../../cactiComponents';
import { WidgetError } from '../widgets/helpers';
import { ConnectFirst } from '../widgets/helpers/ConnectFirst';

interface MultiStepContainerProps {
  status: 'success' | 'error';
  workflowId: string;
  workflowType: string;
  stepId: string;
  stepType: string;
  userActionType: 'tx' | 'acknowledge';
  isFinalStep: boolean;
  stepNumber: number;
  tx: { from: string; to: string; value: string; data: string; gas: string } | null;
  errorMsg: string;
  description: string;
}

interface UserActionTxTypeProps {
  stepNumber: number;
  isFinalStep: boolean;
  tx: { from: string; to: string; value: string; data: string; gas: string } | null;
  sendStepResult: (stepStatus: string, stepStatusMessage: string, userActionData: string) => void;
  description: string;
}

export const MultiStepContainer = ({
  status: workflowStatus,
  workflowId,
  workflowType,
  stepId,
  stepType,
  stepNumber,
  isFinalStep,
  userActionType,
  tx,
  errorMsg,
  description,
}: MultiStepContainerProps) => {
  const { sendMultiStepClientMessage, setIsMultiStepInProgress } = useChatContext();

  const sendStepResult = (
    stepStatus: string,
    stepStatusMessage: string,
    userActionData: string
  ) => {
    if (stepStatus === 'success' && !isFinalStep) {
      setIsMultiStepInProgress(true);
    } else {
      setIsMultiStepInProgress(false);
    }
    const payload = {
      workflow: {
        id: workflowId,
        type: workflowType,
        step: {
          id: stepId,
          type: stepType,
          status: stepStatus,
          statusMessage: stepStatusMessage,
          userActionData: userActionData,
        },
      },
    };

    sendMultiStepClientMessage(payload);
  };

  useEffect(() => {
    if (isFinalStep) {
      setIsMultiStepInProgress(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepNumber, isFinalStep]);

  useEffect(() => {
    if (workflowStatus === 'error') {
      setIsMultiStepInProgress(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workflowStatus]);

  if (workflowStatus === 'error') {
    // todo handle error better
    return <WidgetError>{errorMsg}</WidgetError>;
  }

  if (userActionType === 'tx') {
    return (
      <UserActionTxType
        stepNumber={stepNumber}
        isFinalStep={isFinalStep}
        tx={tx}
        sendStepResult={sendStepResult}
        description={description}
      />
    );
  }

  if (userActionType === 'acknowledge') {
    return <div>ACKNOWLEDGEMENT ACTION TYPE NOT IMPLEMENTED</div>;
  }

  return <div>INVALID</div>;
};

export const UserActionTxType = ({
  stepNumber,
  isFinalStep,
  tx,
  sendStepResult,
  description,
}: UserActionTxTypeProps) => {
  const handleSuccess = (receipt?: TransactionReceipt) => {
    sendStepResult('success', `Transaction successful`, receipt?.transactionHash || '');
  };

  const handleError = (receipt?: TransactionReceipt) => {
    sendStepResult('error', `Transaction failed`, receipt?.transactionHash || '');
  };

  const unsignedTx: UnsignedTransaction = {
    to: tx?.to,
    data: tx?.data,
    value: tx?.value,
    gasLimit: tx?.gas,
  };

  const stepDescription =
    stepNumber === 1 && isFinalStep ? description : `Step ${stepNumber}: ${description}`;

  return (
    <ConnectFirst>
      <HeaderResponse text={stepDescription} />
      <ActionResponse
        label={`Send Transaction`}
        sendParams={unsignedTx}
        onSuccess={handleSuccess}
        onError={handleError}
        txParams={undefined}
        approvalParams={undefined}
      />
    </ConnectFirst>
  );
};

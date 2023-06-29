import { useCallback, useEffect, useState } from 'react';
import { SendTransaction } from '@/components/widgets/SendTransaction';
import { useChatContext } from '@/contexts/ChatContext';
import { WidgetError } from '../widgets/helpers';

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
    return <UserActionTxType tx={tx} sendStepResult={sendStepResult} description={description} />;
  }

  if (userActionType === 'acknowledge') {
    return <div>ACKNOWLEDGE WIDGET</div>;
  }

  return <div>INVALID</div>;
};

export const UserActionTxType = ({ tx, sendStepResult, description }: UserActionTxTypeProps) => {
  const handleTxResult = (
    sendError: Error | null,
    txError: Error | null,
    isTxSuccess: boolean,
    sendTxData: any
  ) => {
    if (sendError?.message || txError?.message) {
      const errMsg = sendError?.message || txError?.message;
      sendStepResult('error', `Transaction failed, error: ${errMsg}`, sendTxData?.hash);
    } else if (isTxSuccess && sendTxData?.hash) {
      sendStepResult(
        'success',
        `Transaction successful, hash: ${sendTxData?.hash}`,
        sendTxData?.hash
      );
    }
  };

  return <SendTransaction tx={tx} description={description} onResult={handleTxResult} />;
};

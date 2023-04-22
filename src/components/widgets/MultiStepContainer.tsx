import { useCallback, useEffect, useState } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import { usePrepareSendTransaction, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { useChatContext } from '../../contexts/ChatContext';
import { Spinner } from '../../utils';
import { Button } from '../Button';
import { TxStatus } from '../TxStatus';
import { SendTransaction } from './SendTransaction';
import { WidgetError } from './helpers';

interface MultiStepContainerProps {
  status: 'success' | 'error';
  workflowId: string;
  workflowType: string;
  stepId: string;
  stepType: string;
  userActionType: 'tx' | 'acknowledge';
  totalSteps: number;
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
  totalSteps,
  userActionType,
  tx,
  errorMsg,
  description,
}: MultiStepContainerProps) => {
  const { sendMultiStepClientMessage, setMultiStepInProgress } = useChatContext();

  const sendStepResult = (
    stepStatus: string,
    stepStatusMessage: string,
    userActionData: string
  ) => {
    if (stepStatus === 'success') {
      setMultiStepInProgress(true);
    } else {
      setMultiStepInProgress(false);
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

  if (stepNumber === totalSteps) {
    setMultiStepInProgress(false);
  }

  if (workflowStatus === 'error') {
    setMultiStepInProgress(false);
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

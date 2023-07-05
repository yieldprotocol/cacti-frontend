import { useEffect } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { useChatContext } from '../../../contexts/ChatContext';
import { Spinner } from '../../../utils';
import { Button } from '../../shared/Button';
import { TxStatus } from '../TxStatus';
import { SendTransaction } from './SendTransaction';
import { WidgetError } from './helpers';

// NOTE: May need to deprecate this in favor of MultiStepContainer
interface SendTransactionWithReplayMsgProps {
  userRequestStatus: 'success' | 'error';
  tx: { from: string; to: string; value: string; data: string; gas: string } | null;
  isApprovalTx: boolean;
  errorMsg: string;
  parsedUserRequest: string;
  description: string;
}

export const SendTransactionWithReplayMsg = ({
  userRequestStatus,
  tx,
  isApprovalTx,
  errorMsg,
  parsedUserRequest,
  description,
}: SendTransactionWithReplayMsgProps) => {
  const { replayUserMessage } = useChatContext();

  const handleTxResult = (
    sendError: Error | null,
    txError: Error | null,
    isTxSuccess: boolean,
    sendTxData: any
  ) => {
    if (isApprovalTx && isTxSuccess) {
      replayUserMessage(parsedUserRequest);
    }
  };

  if (userRequestStatus === 'error') {
    return <WidgetError>{errorMsg}</WidgetError>;
  }

  return <SendTransaction tx={tx} description={description} onResult={handleTxResult} />;
};

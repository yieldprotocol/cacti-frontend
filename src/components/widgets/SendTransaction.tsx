import { useEffect } from 'react';
import { BigNumber } from 'ethers';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { useChatContext } from '../../contexts/ChatContext';
import { Spinner } from '../../utils';
import { Button } from '../Button';
import { TxStatus } from '../TxStatus';
import { WidgetError } from './helpers';

// status, tx, isApprovalTx, errorMsg, parsedUserRequest, description

interface SendTransactionProps {
  userRequestStatus: 'success' | 'error';
  tx: { from: string; to: string; value: string; data: string; gas: string } | null;
  isApprovalTx: boolean;
  errorMsg: string;
  parsedUserRequest: string;
}

export const SendTransaction = ({
  userRequestStatus,
  tx,
  isApprovalTx,
  errorMsg,
  parsedUserRequest,
}: SendTransactionProps) => {
  const { replayUserMessage } = useChatContext();

  const { to, from, value, data, gas } = tx || { to: '', from: '', value: '', data: '', gas: '' };
  const { config } = usePrepareSendTransaction({
    request: { to, from, value, data, gasLimit: gas },
  });
  const {
    data: txResponse,
    isLoading,
    isSuccess,
    error,
    sendTransaction,
  } = useSendTransaction(config);

  useEffect(() => {
    if (isApprovalTx && isSuccess) {
      replayUserMessage(parsedUserRequest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isApprovalTx, isSuccess, parsedUserRequest]);

  if (userRequestStatus === 'error') {
    return <WidgetError>{errorMsg}</WidgetError>;
  }

  return (
    <div className="flex justify-end">
      {!isSuccess && (
        <Button className="px-4" disabled={isLoading} onClick={() => sendTransaction?.()}>
          <div className="flex gap-2">
            Send
            {isLoading ? <Spinner className="mr-0 h-4 self-center" /> : <></>}
          </div>
        </Button>
      )}
      {isSuccess && <TxStatus hash={txResponse?.hash!} />}
      {error && <WidgetError>Error simulating transaction: {error.message}</WidgetError>}
    </div>
  );
};

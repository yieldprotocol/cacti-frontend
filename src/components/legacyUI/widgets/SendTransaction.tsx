import { useEffect } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import {
  useAccount,
  useEnsAvatar,
  useEnsName,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';
import { Spinner } from '../../../utils';
import { Button } from '../../shared/Button';
import { TxStatus } from '../TxStatus';
import { WidgetError } from './helpers';

interface SendTransactionProps {
  tx: { from: string; to: string; value: string; data: string; gas: string } | null;
  description: string;
  onResult: (
    sendError: Error | null,
    txError: Error | null,
    isTxSuccess: boolean,
    sendTxData: any
  ) => void;
}

export const SendTransaction = ({ tx, description, onResult }: SendTransactionProps) => {
  const { address } = useAccount();
  const { refetch: refetchEnsAvatar } = useEnsAvatar({ address: address as `0x${string}` });
  const { refetch: refetchEnsName } = useEnsName({ address: address as `0x${string}` });

  const { to, from, value, data, gas } = tx || { to: '', from: '', value: '', data: '', gas: '' };
  const { config } = usePrepareSendTransaction({
    request: { to, from, value, data, gasLimit: gas },
  });
  const {
    data: sendTxData,
    isLoading,
    isSuccess: isSendSuccess,
    error: sendError,
    sendTransaction,
  } = useSendTransaction(config);
  const addRecentTransaction = useAddRecentTransaction();

  const { isSuccess: isTxSuccess, error: txError } = useWaitForTransaction({
    hash: sendTxData?.hash,
  });

  useEffect(() => {
    onResult(sendError, txError, isTxSuccess, sendTxData);
    // Disable for onResult not to be in dependcies array so as to prevent duplicate calls
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendError, txError, isTxSuccess, sendTxData]);

  useEffect(() => {
    if (sendTxData) {
      addRecentTransaction({ hash: sendTxData.hash!, description });
    }

    if (isTxSuccess) {
      refetchEnsAvatar();
      refetchEnsName();
    }
  }, [
    addRecentTransaction,
    description,
    isTxSuccess,
    refetchEnsAvatar,
    refetchEnsName,
    sendTxData,
  ]);

  return (
    <div className="flex justify-end">
      {!isSendSuccess && (
        <Button
          className="px-4"
          disabled={isLoading}
          onClick={() => {
            sendTransaction?.();
          }}
        >
          <div className="flex gap-2">
            Send
            {isLoading ? <Spinner className="mr-0 h-4 self-center" /> : <></>}
          </div>
        </Button>
      )}
      {isSendSuccess && <TxStatus hash={sendTxData?.hash!} />}
      {sendError && <WidgetError>Error simulating transaction: {sendError.message}</WidgetError>}
    </div>
  );
};

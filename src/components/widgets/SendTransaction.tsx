import { BigNumber } from 'ethers';
import { usePrepareSendTransaction, useSendTransaction } from 'wagmi';
import { Spinner } from '../../utils';
import { Button } from '../Button';
import { TxStatus } from '../TxStatus';
import { WidgetError } from './helpers';

interface SendTransactionProps {
  fromAddress: string;
  toAddress: string;
  data: string;
  gas: string;
  value: string;
  description: string;
}

export const SendTransaction = ({
  fromAddress,
  toAddress,
  data,
  gas,
  value,
  description,
}: SendTransactionProps) => {
  const { config } = usePrepareSendTransaction({
    request: { to: toAddress, from: fromAddress, value, data, gasLimit: gas },
  });
  const {
    data: txResponse,
    isLoading,
    isSuccess,
    error,
    sendTransaction,
  } = useSendTransaction(config);

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

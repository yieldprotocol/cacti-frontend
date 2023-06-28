import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CallOverrides, Overrides, PayableOverrides, UnsignedTransaction } from 'ethers';
import {
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';

export type TxBasicParams = {
  address?: `0x${string}`;
  abi?: any;
  functionName?: string;
  args?: any[];
  overrides?: PayableOverrides | Overrides | CallOverrides;
  enabled?: boolean;
};

/**
 * random UUID for any send transactions -(it is a random UUID so that it is unlikely to clash with any other contract fnName).
 * TODO: consider security implications of this
 * */
export const SEND_ETH_FNNAME = '8bb05f0e-05ed-11ee-be56-0242ac120002';

/**
 * @description Prepares and Submits an arbitrary transaction request and returns relevant tx states and tx data
 *
 * @param params the transaction parameters prepare and submit
 * @param sendParams the send transaction parameters to prepare and submit
 * @param onSuccess callback to run on success
 * @param onError callback to run on error
 */
const useSubmitTx = (
  params?: TxBasicParams,
  sendParams?: UnsignedTransaction,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const [error, setError] = useState<string>();
  const handleError = (error: Error) => {
    console.log(error.message);
    if (onError) onError();
    setError(error.message);
  };
  /**
   * note: usePrepareContractWrite/usePrepareSend : It only runs if all params are defined - so no duplication
   * */
  /* prepare a write transaction */
  const { config: writeConfig, error: prepareError } = usePrepareContractWrite(params);
  console.log('🦄 ~ file: useSubmitTx.tsx:51 ~ writeConfig:', writeConfig);
  console.log('🦄 ~ file: useSubmitTx.tsx:51 ~ prepareError:', prepareError);

  /* prepare a send transaction if the fnName matches the SEND_TRANSACTION unique id */
  const { config: sendConfig } = usePrepareSendTransaction({
    request: { ...(writeConfig.request ?? sendParams) },
    enabled: !!(writeConfig.request ?? sendParams),
    onError: handleError,
  });

  /* usePrepped data to run write or send transactions */
  const {
    data,
    isLoading: isWaitingOnUser,
    sendTransactionAsync,
    isError,
  } = useSendTransaction(sendConfig);

  /* Use the TX hash to wait for the transaction to be mined */
  const {
    data: receipt,
    error: transactError,
    isLoading: isTransacting,
    isSuccess,
    status,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess,
    onError,
  });

  /* DEVELOPER logging */
  useEffect(() => {
    if (receipt?.status === 0) {
      toast.error(`Transaction Error: ${transactError?.message}`);
    }
    if (receipt?.status === 1) {
      toast.success(`Transaction Complete: ${receipt.transactionHash}`);
    }
  }, [receipt?.status, receipt?.transactionHash, transactError?.message]);

  /* Return the transaction data and states */
  return {
    submitTx: sendTransactionAsync,

    receipt,
    hash: data?.hash,

    isWaitingOnUser,
    isError,

    isTransacting,
    isSuccess,
    error,
  };
};

export default useSubmitTx;

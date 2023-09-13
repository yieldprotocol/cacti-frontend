import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { CallOverrides, Overrides, PayableOverrides, UnsignedTransaction } from 'ethers';
import {
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';
import useBalance from './useBalance';

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
 * @param description description of tx for wallet
 */
const useSubmitTx = (
  params?: TxBasicParams,
  sendParams?: UnsignedTransaction,
  onSuccess?: (receipt?: TransactionReceipt) => void,
  onError?: (receipt?: TransactionReceipt) => void,
  description?: string
) => {
  const addRecentTx = useAddRecentTransaction();
  const { refetch: refetchEthBal } = useBalance();

  /**
   * note: usePrepareContractWrite/usePrepareSend : It only runs if all params are defined - so no duplication
   * */

  /* prepare a write transaction */
  const { config: writeConfig } = usePrepareContractWrite({
    ...params,
    onError: (e) => console.log('prepare contract write error', e),
  });

  /* prepare a send transaction if the fnName matches the SEND_TRANSACTION unique id */
  const { config: sendConfig, isError: isPrepareError } = usePrepareSendTransaction({
    request: { ...(writeConfig.request ?? sendParams), gasLimit: sendParams?.gasLimit || 500000 },
    enabled: true,
    onError: (e) => console.log('prepare send error', e),
  });

  /* usePrepped data to run write or send transactions */
  const { data, isLoading: isWaitingOnUser, sendTransactionAsync } = useSendTransaction(sendConfig);

  /* Use the TX hash to wait for the transaction to be mined */
  const {
    data: receipt,
    error,
    isLoading: isPending,
    isError,
    isSuccess,
    status,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: () => {
      if (onSuccess) onSuccess(receipt);
      refetchEthBal();
    },
    onError: (e) => {
      if (onError) onError(receipt);
    },
  });

  // add the transaction to the recent transactions list for rainbow
  useEffect(() => {
    if (data?.hash) {
      addRecentTx({
        hash: data.hash,
        description: description ?? params?.functionName ?? '',
      });
    }
  }, [addRecentTx, data?.hash, description, params?.functionName]);

  /* DEVELOPER logging */
  useEffect(() => {
    if (isError) {
      error && toast.error(`Transaction Error: ${error}`);
    }
    if (isSuccess) {
      receipt && toast.success(`Transaction Complete: ${receipt.transactionHash}`);
    }
  }, [error, isError, isSuccess, receipt]);

  /* Return the transaction data and states */
  return {
    write: sendTransactionAsync,
    receipt,
    hash: data?.hash,
    isPrepareError,
    isWaitingOnUser,
    isError,
    isPending,
    isSuccess,
    error,
    status,
  };
};

export default useSubmitTx;

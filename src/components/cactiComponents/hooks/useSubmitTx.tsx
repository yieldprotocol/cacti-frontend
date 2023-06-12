import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BigNumber, CallOverrides, Overrides, PayableOverrides, ethers } from 'ethers';
import {
  useContractWrite,
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
 * @param sendParams the send ETH transaction parameters to prepare and submit

 * @param onSuccess callback to run on success
 * @param onError callback to run on error
 */
const useSubmitTx = (params?: TxBasicParams, onSuccess?: () => void, onError?: () => void) => {
  /**
   * note: usePrepareContractWrite/usePrepareSend : It only runs if all params are defined - so no duplication
   * */
  /* prepare a write transaction */
  const { config: writeConfig } = usePrepareContractWrite(params);
  /* prepare a send transaction if the fnName matches the SEND_TRANSACTION unique id */
  const sendParams =
    params && params.args && params.functionName !== SEND_ETH_FNNAME
      ? undefined
      : {
          request: {
            to: params?.args?.[0] as string,
            value: params?.args?.[1] || BigNumber.from(0),
          },
        };
  const { config: sendConfig } = usePrepareSendTransaction(sendParams); //sendParams

  /* usePrepped data to run write or send transactions */
  const writeTx = useContractWrite(writeConfig);
  const sendTx = useSendTransaction(sendConfig);

  /* 'Combined results'  - Alhtough it will effectively be one or the other */
  const [data, setData] = useState<any>(undefined);
  const [isWaitingOnUser, setIsWaitingOnUser] = useState<boolean>(false);
  const [transact, setTransact] = useState<any>(undefined);
  const [isError, setIsError] = useState<any>(undefined);

  const { data: writeData, isLoading: isLoadingWrite, write, isError: writeError } = writeTx;
  const { data: sendData, isLoading: isLoadingSend, sendTransaction, isError: sendError } = sendTx;

  useEffect(() => {

    if (write) setTransact(() => write);
    if (sendTransaction) setTransact(() => sendTransaction);

    setData(writeData || sendData);
    setIsWaitingOnUser(isLoadingWrite || isLoadingSend);
    setIsError(writeError || sendError);

  }, [
    write,
    sendTransaction,
    writeData,
    sendData,
    isLoadingWrite,
    isLoadingSend,
    writeError,
    sendError,
  ]);

  /* Use the TX hash to wait for the transaction to be mined */
  const {
    data: receipt,
    error,
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
      toast.error(`Transaction Error: ${error?.message}`);
    }
    if (receipt?.status === 1) {
      toast.success(`Transaction Complete: ${receipt.transactionHash}`);
    }
  }, [receipt, status]);

  /* Return the transaction data and states */
  return {
    submitTx: transact,

    receipt,
    hash: data?.hash,

    isWaitingOnUser: isWaitingOnUser,
    isError: isError,

    isTransacting,
    isSuccess,
    error,
  };
};

export default useSubmitTx;

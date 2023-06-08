import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { CallOverrides, Overrides, PayableOverrides, ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils.js';
import {
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';

export type TxBasicParams = {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  overrides?: PayableOverrides | Overrides | CallOverrides;
};

// random UUID for any send transactions. 
export const SEND_ETH_FNNAME = '8bb05f0e-05ed-11ee-be56-0242ac120002';

// export type SendTxBasicParams = {
//   to: `0x${string}`| undefined;
//   value: ethers.BigNumber | undefined;
// }

/**
 * @description Prepares and Submits an arbitrary transaction request and returns relevant tx states and tx data
 * 
 * @param params the transaction parameters prepare and submit
 * @param sendParams the send ETH transaction parameters to prepare and submit

 * @param onSuccess callback to run on success
 * @param onError callback to run on error
 */
const useSubmitTx = (
  params: TxBasicParams | undefined,
  onSuccess?: () => void,
  onError?: () => void
) => {
  /* note: usePrepareContractWrite/usePrepareSend only run if all params are defined */
  const { config: writeConfig } = usePrepareContractWrite(params);

  /* prepare a send transaction if the fnName matches the SEND_TRANSACTION unique id */
  const sendParams =
    params?.functionName === SEND_ETH_FNNAME
      ? undefined
      : {
          request: {
            to: params?.address as string,
            value: params?.args[0],
          },
        };
  const { config: sendConfig } = usePrepareSendTransaction(sendParams); //sendParams

  /* usePrepped data to run write or send transactions */
  const {
    data: writeData,
    isLoading: isWaitingOnUser,
    write,
    isError: ErrorWrite,
  } = useContractWrite(writeConfig);
  const {
    data: sendData,
    isLoading: isWaitingOnUserSend,
    sendTransaction,
    isError: ErrorSend,
  } = useSendTransaction(sendConfig);

  const combined = {
    data: writeData || sendData,
    isLoading: isWaitingOnUser || isWaitingOnUserSend,
    transact: write || sendTransaction,
    isError: ErrorWrite || ErrorSend,
  };

  const {
    data: receipt,
    error,
    // isError,
    isLoading: isTransacting,
    isSuccess,
    status,
  } = useWaitForTransaction({
    hash: combined.data?.hash,
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

  return {
    submitTx: combined.transact,

    receipt,
    hash: combined.data?.hash,

    isTransacting,
    isWaitingOnUser,

    isSuccess,
    isError: combined.isError,

    error,
  };
};

export default useSubmitTx;

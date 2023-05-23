import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CallOverrides, Overrides, PayableOverrides, ethers } from 'ethers';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

export type TxBasicParams = {
  address: `0x${string}`;
  abi: any;
  functionName: string;
  args: any[];
  overrides?: PayableOverrides | Overrides | CallOverrides;
};

/**
 * @description Submits an arbitrary transaction request and returns relevant tx states and tx data
 * @param request the transaction parameters to submit
 * @param onSuccess callback to run on success
 * @param onError callback to run on error
 */
const useSubmitTx = (
  params: TxBasicParams | undefined,
  onSuccess?: () => void,
  onError?: () => void
) => {


  const { config } = usePrepareContractWrite(params);

  
  const { data: writeData, isLoading: isWaitingOnUser, write, isError } = useContractWrite(config);
  const {
    data: receipt,
    error,
    // isError,
    isLoading: isTransacting,
    isSuccess,
    status,
  } = useWaitForTransaction({
    hash: writeData?.hash,
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
    submitTx: write,

    receipt,
    hash: writeData?.hash,

    isTransacting,
    isWaitingOnUser,

    isSuccess,
    isError,

    error,
  };
};

export default useSubmitTx;

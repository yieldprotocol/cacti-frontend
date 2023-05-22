import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useWaitForTransaction } from 'wagmi';
import useSigner from '@/hooks/useSigner';

/**
 * @description Submits an arbitrary transaction request and returns relevant tx states and tx data
 * @param request the transaction parameters to submit
 * @param onSuccess callback to run on success
 * @param onError callback to run on error
 */
const useSubmitTx = (
  request: ethers.providers.TransactionRequest | undefined,
  onSuccess?: () => void,
  onError?: () => void
) => {
  const signer = useSigner();

  const [hash, setHash] = useState<`0x${string}`>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isPrepared, setIsPrepared] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const prepare = useCallback(async () => {
    let isPrepared = false;
    let gasLimit = request?.gasLimit;
    if (!request) return { isPrepared, gasLimit };

    try {
      gasLimit = await signer?.estimateGas(request);
      setIsPrepared(true);
    } catch (e) {
      console.error('Error preparing', e);
      setError(e);
      setIsPrepared(false);
    }
  }, [request, signer]);

  const submitTx = async () => {
    if (!signer) throw new Error('No signer found');
    if (!request) return undefined;
    if (!isPrepared) return undefined;

    setIsPending(true);
    try {
      const tx = await signer.sendTransaction(request);
      setHash(tx.hash as `0x${string}`);
      setIsPending(false);
    } catch (e) {
      setIsPending(false);
      setError(e);
    }
  };

  useEffect(() => {
    (async () => {
      await prepare();
    })();
  }, [prepare]);

  const {
    isError,
    isLoading,
    isSuccess,
    data: receipt,
  } = useWaitForTransaction({
    hash,
    onSuccess,
    onError,
  });

  return {
    receipt,
    hash,
    isLoading,
    isPendingConfirm: isPending,
    isSuccess,
    isError,
    submitTx,
    isPrepared,
    error,
  };
};

export default useSubmitTx;

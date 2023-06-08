import { useCallback, useContext, useState } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import {
  Address,
  erc20ABI,
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import SettingsContext from '@/contexts/SettingsContext';
import useSigner from '@/hooks/useSigner';
import useToken from '@/hooks/useToken';

export type ApprovalBasicParams = {
  approvalAmount: BigNumber;
  address: Address;
  spender: Address;
  skipApproval?: boolean;
};

const useApproval = (params: ApprovalBasicParams) => {
  const { approvalAmount, address, spender } = params;

  const { isETH } = useToken(undefined, address); // get token data from address (zero address === ETH)

  const [hash, setHash] = useState<`0x${string}`>();
  const [txPending, setTxPending] = useState(false);

  const signer = useSigner();
  const { address: account } = useAccount();

  // Get allowance amount
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spender],
    cacheTime: 20_000,
    enabled: !!account,
  });

  /* Get the useForkSettings the settings context */
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  // for using in fork env
  const contract = useContract({
    address: params?.address,
    abi: erc20ABI,
    signerOrProvider: signer,
  });

  const { config: tokenConfig } = usePrepareContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender, approvalAmount],
  });

  const { writeAsync: approvalWriteAsync } = useContractWrite(tokenConfig);

  const approveTx = useCallback(async () => {
    setTxPending(true);
    try {
      if (isForkedEnv) {
        const tx = await contract?.approve(params?.spender!, params?.approvalAmount!);
        setHash(tx?.hash as `0x${string}`); // TODO fix
      } else {
        const tx = await approvalWriteAsync?.();
        setHash(tx?.hash);
      }
    } catch (error) {
      console.log('user rejected approval');
      setTxPending(false);
    }
    setTxPending(false);
  }, [approvalWriteAsync, contract, isForkedEnv, params?.approvalAmount, params?.spender]);

  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash,
    onSuccess: () => refetchAllowance(),
  });

  return {
    approveTx: params.address === AddressZero || isETH ? undefined : approveTx,
    refetchAllowance,

    approvalReceipt: data,
    approvalHash: hash,

    approvalTransacting: isLoading,
    approvalWaitingOnUser: txPending,

    approvalError: isError,
    approvalSuccess: isSuccess,

    hasAllowance: isETH ? true : allowanceAmount?.gte(approvalAmount),
  };
};

export default useApproval;

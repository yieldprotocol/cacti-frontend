import { useCallback, useContext, useState } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber, BigNumberish, ethers } from 'ethers';
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

const useApproval = (params: ApprovalBasicParams | undefined) => {
  const { isETH } = useToken(undefined, params?.address); // get token data from address (zero address === ETH)

  const [hash, setHash] = useState<Address>();
  const [txPending, setTxPending] = useState(false);

  const signer = useSigner();
  const { address: account } = useAccount();

  // Get allowance amount
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: params?.address! ?? undefined,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, params?.spender!],
    cacheTime: 20_000,
    enabled: !!params?.spender,
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
    address: params?.address ?? undefined,
    abi: erc20ABI,
    functionName: 'approve',
    args: [params?.spender!, params?.approvalAmount!],
    enabled: !!params?.spender,
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
    /* if params are undefined, or address is addressZero (ETH), return empty object */
    approveTx: !params?.address || params.address === AddressZero ? undefined : approveTx,
    refetchAllowance,

    approvalReceipt: data,
    approvalHash: hash,

    approvalTransacting: isLoading,
    approvalWaitingOnUser: txPending,

    approvalError: isError,
    approvalSuccess: isSuccess,

    hasAllowance: isETH ? true : BigNumber.from(allowanceAmount)?.gte(params?.approvalAmount!), // if isETH, then hasAllowance is true, else check if allowanceAmount is greater than amount
  };
};

export default useApproval;

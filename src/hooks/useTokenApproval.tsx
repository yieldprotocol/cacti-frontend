import { useState } from 'react';
import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import useFork from './useFork';
import useSigner from './useSigner';

const useTokenApproval = ({
  address,
  amount,
  spenderAddress,
}: {
  address: `0x${string}`;
  amount: BigNumber;
  spenderAddress: `0x${string}`;
}) => {
  const [hash, setHash] = useState<`0x${string}`>();
  const [txPending, setTxPending] = useState(false);

  const { useForkEnv } = useFork();
  const signer = useSigner();
  const { address: account } = useAccount();
  // Get allowance amount
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spenderAddress],
  });

  // for using in fork env
  const contract = useContract({ address, abi: erc20ABI, signerOrProvider: signer });
  const { config: tokenConfig } = usePrepareContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spenderAddress, amount],
  });

  const { writeAsync: approvalWriteAsync } = useContractWrite(tokenConfig);

  // Check if balance is enough
  const { data: balance } = useContractRead({
    address: address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [account!],
  });

  const approve = async () => {
    setTxPending(true);
    if (useForkEnv) {
      const tx = await contract?.connect(signer!).approve(spenderAddress, amount);
      setHash(tx?.hash as `0x${string}`);
    } else {
      const tx = await approvalWriteAsync?.();
      setHash(tx?.hash);
    }
    setTxPending(false);
  };

  const {
    data,
    isError: txError,
    isLoading,
    isSuccess: txSuccess,
  } = useWaitForTransaction({
    hash,
    onSuccess: () => refetchAllowance(),
  });

  return {
    approve,
    data,
    txPending: txPending || isLoading,
    txError,
    txSuccess,
    hash,
    allowanceAmount,
    hasAllowance: allowanceAmount?.gte(amount),
    refetchAllowance,
    hasBalance: balance?.gte(amount),
  };
};

export default useTokenApproval;

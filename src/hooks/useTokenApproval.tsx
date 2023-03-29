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

  const contract = useContract({ address, abi: erc20ABI, signerOrProvider: signer });
  const { config: tokenConfig } = usePrepareContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spenderAddress, amount],
  });

  const { writeAsync: approvalWriteAsync } = useContractWrite(tokenConfig);

  const [hash, setHash] = useState<`0x${string}`>();

  const approve = async () => {
    if (useForkEnv) {
      const tx = await contract?.connect(signer!).approve(spenderAddress, amount);
      setHash(tx?.hash as `0x${string}`);
    } else {
      const tx = await approvalWriteAsync?.();
      setHash(tx?.hash);
    }
  };

  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash,
    onSuccess: () => refetchAllowance(),
  });

  return {
    approve,
    data,
    isLoading,
    isError,
    isSuccess,
    hash,
    allowanceAmount,
    hasAllowance: allowanceAmount?.gte(amount),
    refetchAllowance,
  };
};

export default useTokenApproval;

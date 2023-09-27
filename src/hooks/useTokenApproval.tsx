import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import useBalance from '@/components/cactiComponents/hooks/useBalance';
import useToken from '@/hooks/useToken';

const useTokenApproval = (
  address: `0x${string}`,
  amount: bigint,
  spenderAddress: `0x${string}`
) => {
  const { data: token } = useToken(undefined, address);
  const { address: account } = useAccount();

  // Get allowance amount
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: address,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spenderAddress],
  });

  const { config: tokenConfig } = usePrepareContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spenderAddress, amount],
  });

  const { writeAsync: approvalWriteAsync, data: writeData } = useContractWrite(tokenConfig);
  const { data: balance } = useBalance(token?.address);

  const {
    data,
    isError: txError,
    isLoading: txPending,
    isSuccess: txSuccess,
  } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess: () => refetchAllowance(),
  });

  return {
    approve: approvalWriteAsync,
    data,
    txPending,
    txError,
    txSuccess,
    hash: writeData?.hash,
    allowanceAmount,
    hasAllowance: allowanceAmount! >= amount,
    refetchAllowance,
    hasBalance: balance! >= amount,
  };
};

export default useTokenApproval;

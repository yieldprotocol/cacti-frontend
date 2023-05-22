import { useContext, useState } from 'react';
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
import SettingsContext from '@/contexts/SettingsContext';
import useBalance from '@/hooks/useBalance';
import useSigner from '@/hooks/useSigner';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';

const useTokenApproval = (
  address: `0x${string}`,
  amount: BigNumber,
  spender: `0x${string}`
) => {
  const { data: token } = useToken(undefined, address);

  const amountToUse = BigNumber.from(cleanValue(amount.toString(), token?.decimals));
  const [hash, setHash] = useState<`0x${string}`>();
  const [txPending, setTxPending] = useState(false);

  const signer = useSigner();
  const { address: account } = useAccount();
  
  // Get allowance amount
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spender],
  });
  
  /* Get the useForkSettings the settings context */
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  // for using in fork env
  const contract = useContract({ address, abi: erc20ABI, signerOrProvider: signer });
  const { config: tokenConfig } = usePrepareContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender, amountToUse],
  });

  const { writeAsync: approvalWriteAsync } = useContractWrite(tokenConfig);
  const { data: balance } = useBalance(token?.address);

  const approve = async () => {
    setTxPending(true);
    try {
      if (isForkedEnv) {
        const tx = await contract?.approve(spender, amountToUse);
        setHash(tx?.hash as `0x${string}`);
      } else {
        const tx = await approvalWriteAsync?.();
        setHash(tx?.hash);
      }
    } catch (error) {
      console.log('user rejected approval');
      setTxPending(false);
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

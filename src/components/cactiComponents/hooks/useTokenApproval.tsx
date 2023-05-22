import { useContext, useState } from 'react';
import { BigNumber, ethers } from 'ethers';
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
  address: `0x${string}` | undefined,
  amount: BigNumber | undefined,
  spender: `0x${string}` | undefined
) => {

  const addressOrAddressZero = address ? address : ethers.constants.AddressZero;
  const { data: token } = useToken(undefined, addressOrAddressZero);

  const amountOrZero = amount ? amount : BigNumber.from(0);
  const amountToUse = BigNumber.from(cleanValue(amountOrZero.toString(), token?.decimals));

  const [hash, setHash] = useState<`0x${string}`>();
  const [txPending, setTxPending] = useState(false);

  const signer = useSigner();
  const { address: account } = useAccount();
  
  // Get allowance amount
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({

    address: spender ? address: undefined, // check if spender is defined. if it (or address) is undefined, this hook doesn't run. ( https://wagmi.sh/react/hooks/useContractRead )
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spender!],
  });
  
  /* Get the useForkSettings the settings context */
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  // for using in fork env
  const contract = useContract({ address, abi: erc20ABI, signerOrProvider: signer });
  const { config: tokenConfig } = usePrepareContractWrite({
    address: spender ? address: undefined, // check if spender is defined. if it (or address) is undefined, this hook doesn't run. ( https://wagmi.sh/react/hooks/useContractRead )
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender!, amountToUse],
  });

  const { writeAsync: approvalWriteAsync } = useContractWrite(tokenConfig);
  const { data: balance } = useBalance(token?.address);

  const approve = async () => {
    setTxPending(true);
    try {
      if (isForkedEnv && spender) {
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
    hasAllowance: allowanceAmount?.gte(amountOrZero),
    refetchAllowance,
    hasBalance: balance?.gte(amountOrZero),
  };
};

export default useTokenApproval;

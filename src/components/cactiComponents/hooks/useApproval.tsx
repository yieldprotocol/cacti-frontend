import { useContext, useState } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber, BigNumberish, ethers } from 'ethers';
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
import useSigner from '@/hooks/useSigner';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import useBalance from './useBalance';

export type ApprovalBasicParams = {
  amount: BigNumber;
  address: `0x${string}`;
  spender: `0x${string}`;
};

const useApproval = (params: ApprovalBasicParams | undefined) => {
  /* if params are undefined, or address is addressZero (ETH), return empty object */
  if (params === undefined || params.address === AddressZero)
    return { approve: undefined, hasAllowance: true };

  const { amount, address, spender } = params;

  // const addressOrAddressZero = address || ethers.constants.AddressZero; // if address is undefined, use addressZero
  const { data: token } = useToken(undefined, address); // get token data from address (zero address === ETH)

  // const amountOrZero = amount ? amount : BigNumber.from(0);
  const amountToUse = BigNumber.from(cleanValue(amount.toString(), token?.decimals));

  const [hash, setHash] = useState<`0x${string}`>();
  const [txPending, setTxPending] = useState(false);

  const signer = useSigner();
  const { address: account } = useAccount();

  // Get allowance amount
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: spender ? address : undefined, // check if spender is defined. if it (or address) is undefined, this hook doesn't run. ( https://wagmi.sh/react/hooks/useContractRead )
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spender!],
    scopeKey: `allowance_${address}`,
    cacheTime: 20_000,
    enabled: true,
  });

  /* Get the useForkSettings the settings context */
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  // for using in fork env
  const contract = useContract({ address, abi: erc20ABI, signerOrProvider: signer });
  const { config: tokenConfig } = usePrepareContractWrite({
    address: spender ? address : undefined, // check if spender is defined. if it (or address) is undefined, this hook doesn't run. ( https://wagmi.sh/react/hooks/useContractRead )
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender!, amountToUse],
    // enabled: true,
  });

  const { write: approvalWrite, writeAsync: approvalWriteAsync } = useContractWrite(tokenConfig);

  const approveTx = async () => {
    setTxPending(true);
    try {
      if (isForkedEnv) {
        const tx = await contract?.approve(spender!, amountToUse);
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

  const { data, isError, isLoading, isSuccess } = useWaitForTransaction({
    hash,
    onSuccess: () => refetchAllowance(),
  });

  return {
    approveTx,
    refetchAllowance,

    approvalReceipt: data,
    approvalHash: hash,

    approvalTransacting: isLoading,
    approvalWaitingOnUser: txPending,

    approvalError: isError,
    approvalSuccess: isSuccess,

    hasAllowance: allowanceAmount?.gte(amountToUse), // if isETH, then hasAllowance is true, else check if allowanceAmount is greater than amount
  };
};

export default useApproval;
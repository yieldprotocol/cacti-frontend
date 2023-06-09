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

export type ApprovalBasicParams = {
  approvalAmount: BigNumber;
  address: `0x${string}`;
  spender: `0x${string}`;
  skipApproval?: boolean;
};

const useApproval = (params: ApprovalBasicParams) => {
  /* Get the useForkSettings the settings context */
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  const signer = useSigner();
  const { address: account } = useAccount();

  //local state
  const [hash, setHash] = useState<`0x${string}`>();
  const [txPending, setTxPending] = useState(false);

  const { approvalAmount, address, spender } = params;
  const { data: token } = useToken(undefined, address); // get token data from address (zero address === ETH)
  // cleanup the bignumber and convert back to a bignumber to avoid underlow errors;
  const amountToUse = BigNumber.from(cleanValue(approvalAmount.toString(), token?.decimals));

  // Get allowance amount - doesn't run if address or spender is undefined
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: spender ? address : undefined, // check if spender is defined. if it (or address) is undefined, this hook doesn't run. ( https://wagmi.sh/react/hooks/useContractRead )
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spender!],
    scopeKey: `allowance_${address}`,
    cacheTime: 20_000,
    enabled: true,
  });

  // Prepare the approval transaction 
  const contract = useContract({ address, abi: erc20ABI, signerOrProvider: signer });
  const { config: tokenConfig } = usePrepareContractWrite({
    address: spender ? address : undefined, // check if spender is defined. if it (or address) is undefined, this hook doesn't run. ( https://wagmi.sh/react/hooks/useContractRead )
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender!, amountToUse],
    // enabled: true,
  });

  const { writeAsync: approvalWriteAsync } = useContractWrite(tokenConfig);

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

  /* if params are undefined, or address is addressZero (ETH), return empty object */
  if (params === undefined || params.address === AddressZero || params.skipApproval)
    return { approveTx: undefined, hasAllowance: true };

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

import { useContext, useEffect, useState } from 'react';
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
  tokenAddress: `0x${string}`;
  spender: `0x${string}`;
  skipApproval?: boolean;
  skipBalanceCheck?: boolean; // TODO make this more robust
};

const validateAddress = (addr: `0x${string}`): `0x${string}` | undefined =>
  addr === AddressZero ? undefined : addr;

const useApproval = (params: ApprovalBasicParams) => {
  /* Get the useForkSettings the settings context */
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  const signer = useSigner();
  const { address: account } = useAccount();

  //local state
  const [txPending, setTxPending] = useState(false);

  const { approvalAmount, tokenAddress, spender } = params;
  const { data: token } = useToken(undefined, tokenAddress); // get token data from address (zero address === ETH)
  // cleanup the bignumber and convert back to a bignumber to avoid underlow errors;
  const amountToUse = BigNumber.from(cleanValue(approvalAmount.toString(), token?.decimals));

  // Get allowance amount - doesn't run if address or spender is undefined
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: validateAddress(tokenAddress),
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spender],
    enabled: !!validateAddress(spender) && !params.skipApproval, // only enable if both address and spender are defined, and not skip approval
  });

  // Prepare the approval transaction - doesn't run if address or spender is undefined
  const { config: tokenConfig } = usePrepareContractWrite({
    address: validateAddress(tokenAddress),
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender!, amountToUse],
    enabled: !!validateAddress(spender) && !params.skipApproval, // only enable if both address and spender are defined.
  });

  const { writeAsync, data } = useContractWrite(tokenConfig);

  const { isError, isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => await refetchAllowance(),
  });

  return {
    approveTx: params.skipApproval ? undefined : writeAsync,
    refetchAllowance,

    approvalReceipt: data,
    approvalHash: data?.hash,

    approvalTransacting: isLoading,
    approvalWaitingOnUser: txPending,

    approvalError: isError,
    approvalSuccess: isSuccess,

    hasAllowance: params.skipApproval ? true : allowanceAmount?.gte(amountToUse), // if isETH, then hasAllowance is true, else check if allowanceAmount is greater than amount
  };
};

export default useApproval;

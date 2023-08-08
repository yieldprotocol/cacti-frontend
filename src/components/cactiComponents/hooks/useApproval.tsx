import { useMemo } from 'react';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';

export type ApprovalBasicParams = {
  approvalAmount: BigNumber;
  tokenAddress: `0x${string}`;
  spender: `0x${string}`;
  skipApproval?: boolean;
};

const validateAddress = (addr: `0x${string}`): `0x${string}` | undefined =>
  addr === AddressZero ? undefined : addr;

const useApproval = (params: ApprovalBasicParams) => {
  const chainId = useChainId();
  const { address: account } = useAccount();
  const { approvalAmount, tokenAddress: _tokenAddress, spender: _spender } = params;
  const tokenAddress = validateAddress(_tokenAddress);
  const spender = validateAddress(_spender);
  const { data: token } = useToken(undefined, tokenAddress); // get token data from address (zero address === ETH)

  // cleanup the bignumber and convert back to a bignumber to avoid underlow errors;
  const amountToUse = useMemo(
    () => BigNumber.from(cleanValue(approvalAmount.toString(), token?.decimals)),
    [approvalAmount, token?.decimals]
  );

  // Get allowance amount - doesn't run if address or spender is undefined
  const { data: allowanceAmount, refetch: refetchAllowance } = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'allowance',
    args: [account!, spender!],
  });

  // Prepare the approval transaction - doesn't run if address or spender is undefined
  const { config, isError: isPrepareError } = usePrepareContractWrite({
    address: !params.skipApproval ? tokenAddress : undefined,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spender!, amountToUse],
    chainId,
  });

  const { writeAsync: approveTx, data, isLoading: isWaitingOnUser } = useContractWrite(config);

  const {
    isError,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => await refetchAllowance(),
  });

  return {
    write: !!params.skipApproval ? undefined : approveTx,
    refetchAllowance,
    receipt: data,
    hash: data?.hash,
    isPrepareError,
    isWaitingOnUser,
    isError,
    isPending,
    isSuccess,
    hasAllowance: params.skipApproval ? true : allowanceAmount?.gte(amountToUse), // if isETH, then hasAllowance is true, else check if allowanceAmount is greater than amount
  };
};

export default useApproval;

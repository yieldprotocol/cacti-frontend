//@ts-nocheck
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { AddressZero } from '@ethersproject/constants';
import { BigNumber } from 'ethers';
import { erc20ABI, useContractWrite, useWaitForTransaction } from 'wagmi';
import { prepareWriteContract } from 'wagmi/actions';
import useChainId from '@/hooks/useChainId';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import useAllowance from './useAllowance';

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
  const { approvalAmount, tokenAddress: _tokenAddress, spender: _spender } = params;
  const tokenAddress = validateAddress(_tokenAddress);
  const spender = validateAddress(_spender);
  const { data: token } = useToken(undefined, tokenAddress); // get token data from address (zero address === ETH)

  // cleanup the bignumber and convert back to a bignumber to avoid underlow errors;
  const amountToUse = useMemo(
    () => BigNumber.from(cleanValue(approvalAmount.toString(), token?.decimals)),
    [approvalAmount, token?.decimals]
  );

  const { data: allowanceAmount, refetch: refetchAllowance } = useAllowance({
    tokenAddress,
    spender,
  });

  // Prepare the approval transaction - doesn't run if address or spender is undefined
  const { data: config, isError: isPrepareError } = useQuery({
    queryKey: ['prepareApprove', tokenAddress, spender, chainId],
    queryFn: async () => {
      if (!spender) {
        console.error(`Spender not found for approval`);
        return;
      }

      // is eth
      if (!tokenAddress) {
        return;
      }

      const config = await prepareWriteContract({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [spender, amountToUse],
        chainId,
      });

      return config;
    },
    refetchOnWindowFocus: false,
  });

  const { write: approveTx, data, isLoading: isWaitingOnUser } = useContractWrite(config);

  const {
    isError,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess: async () => await refetchAllowance(),
  });

  const hasAllowance = useMemo(() => {
    if (!!params.skipApproval) return true;
    if (!allowanceAmount) return false;
    return allowanceAmount.gte(amountToUse);
  }, [allowanceAmount, amountToUse, params.skipApproval]);

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
    hasAllowance,
  };
};

export default useApproval;

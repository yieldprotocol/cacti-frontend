import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { UNISWAP_ROUTER_02_ADDRESS } from '@/utils/constants';

const useTokenApproval = ({
  address,
  amountIn,
}: {
  address: `0x${string}`;
  amountIn: BigNumber;
}) => {
  const { chain } = useNetwork();
  const { config: tokenConfig } = usePrepareContractWrite({
    address: address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [UNISWAP_ROUTER_02_ADDRESS, amountIn],
  });
  const { write: approvalWrite, data, isLoading, isSuccess } = useContractWrite(tokenConfig);
  return { approvalWrite, data, isLoading, isSuccess };
};

export default useTokenApproval;

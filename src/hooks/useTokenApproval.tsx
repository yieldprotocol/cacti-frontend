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
  spenderAddress,
}: {
  address: `0x${string}`;
  amountIn: BigNumber;
  spenderAddress: `0x${string}`;
}) => {
  const { chain } = useNetwork();
  const { config: tokenConfig } = usePrepareContractWrite({
    address,
    abi: erc20ABI,
    functionName: 'approve',
    args: [spenderAddress, amountIn],
  });
  const { write: approvalWrite, data, isLoading, isSuccess } = useContractWrite(tokenConfig);
  return { approvalWrite, data, isLoading, isSuccess };
};

export default useTokenApproval;

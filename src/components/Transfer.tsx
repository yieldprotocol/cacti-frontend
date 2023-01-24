import { BigNumber, utils } from "ethers";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useContractWrite,
  usePrepareContractWrite,
  erc20ABI,
  useContractRead,
  UseContractConfig,
} from "wagmi";

interface Props {
  token?: string;
  amount: string;
  receiver: string;
}

export function TransferEth({ amount, receiver }: Props) {
  const { config } = usePrepareSendTransaction({
    request: { to: receiver, value: BigNumber.from(amount) },
  });
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  return (
    <div>
      <button
        disabled={!sendTransaction}
        onClick={() => sendTransaction?.()}
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Send {utils.formatEther(amount)} ETH to{" "}
        {receiver.slice(0, 4) + "..." + receiver.slice(-4)}
      </button>
    </div>
  );
}

export function TransferToken({ token, amount, receiver }: Props) {
  const { config: tokenConfig, error } = usePrepareContractWrite({
    address: `0x${token.replace(/^0x/, "")}`,
    abi: erc20ABI,
    functionName: "transfer",
    args: [`0x${receiver.replace(/^0x/, "")}`, BigNumber.from(amount)],
  });

  const {
    data: tokenData,
    isLoading: tokenIsLoading,
    isSuccess: tokenIsSuccess,
    write: tokenWrite,
  } = useContractWrite(tokenConfig);

  // Get token symbol
  const { data: tokenSymbol } = useContractRead({
    address: `0x${token.replace(/^0x/, "")}`,
    abi: erc20ABI,
    functionName: "symbol",
  });

  return (
    <div>
      <button
        disabled={!tokenWrite}
        onClick={() => tokenWrite?.()}
        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Send {utils.formatEther(amount)} {tokenSymbol} to{" "}
        {receiver.slice(0, 4) + "..." + receiver.slice(-4)}
      </button>
    </div>
  );
}

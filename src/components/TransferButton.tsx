import { BigNumber, utils } from "ethers";
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useContractWrite,
  usePrepareContractWrite,
  erc20ABI,
  useContractRead,
} from "wagmi";
import { Button } from "@/components/Button";
import { shortenAddress } from "@/utils";

interface TransferButtonProps {
  token?: string;
  amount: string; // assume it's in raw decimal format
  receiver: string;
}

export const TransferButton = (props: TransferButtonProps) => {
  if (props.token) return <TransferToken {...props} />;
  return <TransferEth {...props} />;
};

const TransferEth = ({ amount, receiver }: TransferButtonProps) => {
  const { config } = usePrepareSendTransaction({
    request: { to: receiver, value: BigNumber.from(amount) },
  });
  const { sendTransaction } = useSendTransaction(config);

  return (
    <div>
      <Button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send {utils.formatEther(amount)} ETH to {shortenAddress(receiver)}
      </Button>
    </div>
  );
};

const TransferToken = ({ token, amount, receiver }: TransferButtonProps) => {
  const { config: tokenConfig } = usePrepareContractWrite({
    address: token as `0x${string}`,
    abi: erc20ABI,
    functionName: "transfer",
    args: [receiver as `0x${string}`, BigNumber.from(amount)],
  });

  const { write: tokenWrite } = useContractWrite(tokenConfig);

  // Get token symbol
  const { data: tokenSymbol, isFetchedAfterMount } = useContractRead({
    address: token as `0x${string}`,
    abi: erc20ABI,
    functionName: "symbol",
  });
  return (
    <div>
      <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
        Send {utils.formatEther(amount)}{" "}
        {isFetchedAfterMount ? tokenSymbol : "token"} to{" "}
        {shortenAddress(receiver)}
      </Button>
    </div>
  );
};

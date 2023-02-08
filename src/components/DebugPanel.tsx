import { Button } from '@/components/Button';
import { useChatContext } from '@/contexts/ChatContext';

export const DebugPanel = ({ handleClose }) => {
  const { spoofBotMessage } = useChatContext();
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that ETH. <|transfer("ETH", 0.1, "vitalik.eth")|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an ETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer("ETH", 0.1, "vitalik.eth")|>`}</p>
      </div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that wETH. <|transfer("WETH", 0.1, "vitalik.eth")|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an wETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer("WETH", 0.1, "vitalik.eth")|>`}</p>
      </div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that WETH into UNI. <|uniswap("WETH", "UNI", 0.1)|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a wETH to UNI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|uniswap("WETH", "UNI", 0.1)|>`}</p>
      </div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that ETH into UNI. <|uniswap("ETH", "UNI", 0.1)|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a ETH to UNI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|uniswap("ETH", "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984", 0.1)|>`}</p>
      </div>
    </div>
  );
};

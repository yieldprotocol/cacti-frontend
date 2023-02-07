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
            `Sure, let me transfer that ETH. <|transfer('ETH', 0.1, 'vitalik.eth')|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an ETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer('ETH', 0.1, 'vitalik.eth')|>`}</p>
      </div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that wETH. <|transfer('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 0.1, 'vitalik.eth')|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an wETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 0.1, 'vitalik.eth')|>`}</p>
      </div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that wETH into UNI. <|swap('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', '0.1')|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a wETH to UNI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|swap('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', '0.1')|>`}</p>
      </div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me swap that ETH into UNI. <|swap('ETH', '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', '0.1')|> Click the above button to make the swap.`
          );
        }}
      >
        Suggest a ETH to UNI token swap on Uniswap
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|swap('ETH', '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984', '0.1')|>`}</p>
      </div>
    </div>
  );
};

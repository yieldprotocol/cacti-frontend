import { useChatContext } from '@/contexts/ChatContext';
import { Button } from './Button';

export const DebugPanel = ({ handleClose }) => {
  const { spoofBotMessage } = useChatContext();
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that ETH. <|transfer('ETH', 1000000000000000000, 'vitalik.eth')|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an ETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer('ETH', 1000000000000000000, 'vitalik.eth')|>`}</p>
      </div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that wETH. <|transfer('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 1000000000000000000, 'vitalik.eth')|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an wETH transfer
      </Button>
      <div className="flex flex-col justify-center text-xs">
        <p>{`<|transfer('0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6', 1000000000000000000, 'vitalik.eth')|>`}</p>
      </div>
    </div>
  );
};

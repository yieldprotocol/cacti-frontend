import { useChatContext } from '@/contexts/ChatContext';
import { Button } from './Button';

export const DebugPanel = ({ handleClose }) => {
  const { spoofBotMessage } = useChatContext();
  return (
    <div>
      <Button
        onClick={(e) => {
          handleClose();
          spoofBotMessage(
            `Sure, let me transfer that ETH. <|transfer('ETH', 100000000000, 'vitalik.eth')|> Click the above button to make the transfer.`
          );
        }}
      >
        Suggest an ETH transfer
      </Button>
    </div>
  );
};

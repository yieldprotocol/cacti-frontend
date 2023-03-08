import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';
import WelcomeMessage from '@/components/WelcomeMessage';
import { useChatContext } from '@/contexts/ChatContext';

export const ChatBox = () => {
  const { messages } = useChatContext();
  return (
    <div className="flex max-h-full min-h-full flex-col justify-between pt-20 ">
      <div className="min-h-full overflow-auto">
        {messages.length > 1 ? <MessageList /> : <WelcomeMessage />}
      </div>
      <div className="w-full py-5 md:px-64">
        <MessageInput />
      </div>
    </div>
  );
};

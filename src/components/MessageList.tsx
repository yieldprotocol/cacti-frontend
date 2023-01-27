import { MessageItem } from '@/components/MessageItem';
import { useChatContext } from '@/contexts/ChatContext';

export const MessageList = () => {
  const { messages, isBotThinking } = useChatContext();
  return (
    <div className="flex max-h-full w-full flex-col gap-4 overflow-y-auto rounded-md p-4">
      {messages.map((message, i) => (
        <MessageItem key={`m${i}`} message={message} />
      ))}
      {isBotThinking && <div>Bot is thinking...</div>}
    </div>
  );
};

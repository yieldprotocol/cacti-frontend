import { MessageItem } from '@/components/MessageItem';
import { useChatContext } from '@/contexts/ChatContext';

export const MessageList = () => {
  const { messages, isBotThinking } = useChatContext();
  return (
    <div className="flex flex-col rounded-md">
      {messages.map((message, i) => (
        <MessageItem key={`m${i}`} message={message} />
      ))}
      {isBotThinking && (
        <div className="flex justify-center bg-gray-600 p-6 text-white">Bot is thinking...</div>
      )}
    </div>
  );
};

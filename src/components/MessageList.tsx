import { useEffect, useRef } from 'react';
import { MessageItem } from '@/components/MessageItem';
import { useChatContext } from '@/contexts/ChatContext';

export const MessageList = () => {
  const { messages, isBotThinking, showDebugMessages } = useChatContext();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full">
      {messages.map((message, i) => {
        if (!showDebugMessages && message.actor == 'system') {
          return <></>;
        }
        return <MessageItem key={`m${i}`} message={message} />;
      })}
      {isBotThinking && (
        <div className="flex justify-center bg-gray-600 p-6 text-white">Bot is thinking...</div>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

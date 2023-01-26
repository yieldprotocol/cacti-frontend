import { MessageItem } from "@/components/MessageItem";
import { useChatContext } from "@/contexts/ChatContext";

export const MessageList = () => {
  const { messages } = useChatContext();
  return (
    <div className="flex flex-col gap-4 overflow-y-auto w-full max-h-full rounded-md p-4">
      {messages
        .map((message, i) => (
          <MessageItem
            key={`m${i}`}
            message={message}
          />
        ))}
    </div>
  );
};

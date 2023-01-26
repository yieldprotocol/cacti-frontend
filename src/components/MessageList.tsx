import { MessageItem } from "@/components/MessageItem";

export const MessageList = ({ messages, owner }) => {
  return (
    <div className="flex flex-col-reverse gap-4 overflow-y-auto w-full max-h-full rounded-md p-4">
      {messages
        .slice(0)
        .reverse()
        .map((messageItem) => (
          <MessageItem
            key={messageItem.id}
            owner={owner}
            sender={messageItem.sender}
            senderAvatar={messageItem.senderAvatar}
            message={messageItem.message}
          />
        ))}
    </div>
  );
};

import { MessageItem } from "../MessageItem/MessageItem";

export const MessageList = ({ messages, owner }) => {
  return (
    <div className="flex flex-col-reverse overflow-y-auto bg-white p-4">
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

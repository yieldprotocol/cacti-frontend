import { InputMessage } from "@/components/InputMessage";
import { MessageList } from "@/components/MessageList";
import { useState } from "react";

export const ChatBox = ({
  sendMessage,
  owner,
  messages,
  ownerAvatar,
  resetTyping,
  typing,
}) => {
  const [isLoading, setIsLoading] = useState<Boolean>();
  const sendMessageLoading = (sender, senderAvatar, message) => {
    setIsLoading(true);
    sendMessage(sender, senderAvatar, message);
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };
  return (
    <div className="flex flex-col rounded-md w-full max-h-full bg-white justify-between mb-10">
      <div className="rounded-lg w-full overflow-auto">
        <MessageList owner={owner} messages={messages} />
      </div>
      <div className="p-4">
        <InputMessage
          isLoading={isLoading}
          owner={owner}
          ownerAvatar={ownerAvatar}
          sendMessage={sendMessage}
          sendMessageLoading={sendMessageLoading}
          typing={typing}
          resetTyping={resetTyping}
        />
      </div>
    </div>
  );
};

import { InputMessage } from "@/components/InputMessage";
import { MessageList } from "@/components/MessageList";
import { Title } from "@/components/Title";
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
    <div className="float-left flex-shrink flex-grow ">
      <Title owner={owner} />
      <div className="rounded-lg bg-white">
        <MessageList owner={owner} messages={messages} />
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
    </div>
  );
};

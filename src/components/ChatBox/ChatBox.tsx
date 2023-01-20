import { useState } from "react";
import { InputMessage } from "../InputMessage/InputMessage";
import { TypingIndicator } from "../TypingIndicator/TypingIndicator";
import { MessageList } from "../MessageList/MessageList";
import { Title } from "../Title/Title";

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
    <div className="float-left flex-shrink flex-grow">
      <Title owner={owner} />
      <MessageList owner={owner} messages={messages} />
      <div className="p-4">
        <TypingIndicator owner={owner} isTyping={typing} />
        <div className="">
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

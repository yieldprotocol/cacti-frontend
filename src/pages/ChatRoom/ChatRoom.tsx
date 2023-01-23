import { useEffect, useState } from "react";
import { ChatBox } from "@/components/ChatBox";
import useWebSocket, { ReadyState } from "react-use-websocket";
function detectURL(message) {
  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (urlMatch) {
    return '<a href="' + urlMatch + '">' + urlMatch + "</a>";
  });
}

export const ChatRoom = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "Bot",
      senderAvatar: "https://i.pravatar.cc/150?img=32",
      message: "Hello 👋,How can I help you?",
    },
  ]);
  const [isTyping, setTyping] = useState([]);
  const {
    sendMessage: wsSendMessage,
    lastMessage,
    readyState,
  } = useWebSocket("ws://localhost:9999");

  useEffect(() => {
    if (lastMessage !== null) {
      let newMessageItem = {
        id: messages.length + 1,
        sender: "Bot",
        senderAvatar: "https://i.pravatar.cc/150?img=32",
        message: lastMessage.data,
      };
      setMessages([...messages, newMessageItem]);
    }
  }, [lastMessage]);

  /* adds a new message to the chatroom */
  const sendMessage = (sender, senderAvatar, message) => {
    setTimeout(() => {
      let messageFormat = detectURL(message);
      let newMessageItem = {
        id: messages.length + 1,
        sender: sender,
        senderAvatar: senderAvatar,
        message: messageFormat,
      };
      wsSendMessage(message);
      setMessages([...messages, newMessageItem]);
      resetTyping(sender);
    }, 400);
  };
  /* updates the writing indicator if not already displayed */
  const typing = (writer) => {
    if (!isTyping[writer]) {
      isTyping[writer] = true;
      setTyping(isTyping);
    }
  };
  /* hide the writing indicator */
  const resetTyping = (writer) => {
    isTyping[writer] = false;
    setTyping(isTyping);
  };

  let user = { name: "Ryon", avatar: "https://i.pravatar.cc/150?img=56" };
  let bot = { name: "Bot", avatar: "https://i.pravatar.cc/150?img=32" };

  return (
    <div className="flex content-start justify-center px-80">
      <ChatBox
        owner={user.name}
        ownerAvatar={user.avatar}
        sendMessage={sendMessage}
        typing={typing}
        resetTyping={resetTyping}
        messages={messages}
      />
    </div>
  );
};

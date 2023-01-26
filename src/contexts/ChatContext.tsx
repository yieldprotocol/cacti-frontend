import { useState, ReactNode, createContext, useContext, useEffect } from "react";
import useWebSocket from "react-use-websocket";

export type Message = {
  isBot: boolean;
  payload: string;
}

type UserMessage =  Omit<Message, "avatar">

export type ChatContextType = {
  messages: Message[]
  addMessage: (msg: UserMessage) => void,
  getAvatar: (isBot: boolean) => string,
  isBotThinking: boolean
};

const userAvatar = "https://i.pravatar.cc/150?img=56";
const botAvatar = "https://i.pravatar.cc/150?img=32";
const getAvatar = (isBot: boolean) => isBot ? botAvatar : userAvatar

const initialContext = {
  messages: [{
    isBot: true,
    payload: "Hello 👋,How can I help you?"
  }],
  addMessage: (msg: UserMessage) => {},
  getAvatar,
  isBotThinking: false
};

const ChatContext = createContext<ChatContextType>(initialContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(initialContext.messages);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(initialContext.isBotThinking)
  const {
    sendMessage: wsSendMessage,
    lastMessage,
    readyState,
  } = useWebSocket("ws://localhost:9999");

  useEffect(() => {
    if(!lastMessage) return;
    const msg = {
      payload: lastMessage.data,
      isBot: true
    }
    setIsBotThinking(false);
    setMessages(messages => [...messages, msg])
  }, [lastMessage]);

  const addMessage = (msg: UserMessage) => {
    setIsBotThinking(true);
    wsSendMessage(msg.payload)
    setMessages([...messages, msg])
  }
  return (
    <ChatContext.Provider
      value={{
        messages, addMessage, getAvatar, isBotThinking
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);

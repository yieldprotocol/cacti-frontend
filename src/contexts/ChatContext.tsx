import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useModalContext } from '@/contexts/ModalContext';

export type Message = {
  isBot: boolean;
  payload: string;
};

// type UserMessage = Omit<Message, 'avatar'>;

export type ChatContextType = {
  messages: Message[];
  sendMessage: (msg: string) => void;
  spoofBotMessage: (msg: string) => void;
  getAvatar: (isBot: boolean) => string;
  isBotThinking: boolean;
};

const userAvatar = 'https://i.pravatar.cc/150?img=56';
const botAvatar = 'https://i.pravatar.cc/150?img=32';
const getAvatar = (isBot: boolean) => (isBot ? botAvatar : userAvatar);

const initialContext = {
  messages: [
    {
      isBot: true,
      payload: 'Hello 👋, how can I help you?',
    },
  ],
  sendMessage: (msg: string) => {},
  spoofBotMessage: (msg: string) => {},
  getAvatar,
  isBotThinking: false,
};

const ChatContext = createContext<ChatContextType>(initialContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(initialContext.messages);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(initialContext.isBotThinking);
  const { setModal } = useModalContext();
  const {
    sendJsonMessage: wsSendMessage,
    lastMessage,
    readyState,
  } = useWebSocket('wss://chatweb3.func.ai:9998', {
    onError: (evt) => setModal(<div>Websocket error</div>),
    shouldReconnect: (closeEvent) => true,
  });

  useEffect(() => {
    if (!lastMessage) return;
    let payload = lastMessage.data;
    try {
      const obj = JSON.parse(payload);
      if (obj?.actor == 'bot' && obj?.type == 'text') {
        payload = obj.payload;
      }
    } catch (e) {
      // legacy message format, do nothing
    }
    const msg = {
      payload,
      isBot: true,
    };
    setIsBotThinking(false);
    setMessages((messages) => [...messages, msg]);
  }, [lastMessage]);

  const sendMessage = (msg: string) => {
    setIsBotThinking(true);
    wsSendMessage({ actor: 'user', type: 'text', payload: msg });
    setMessages([
      ...messages,
      {
        isBot: false,
        payload: msg,
      },
    ]);
  };

  const spoofBotMessage = (msg: string) => {
    setIsBotThinking(true);
    setTimeout(() => {
      setMessages([
        ...messages,
        {
          isBot: true,
          payload: msg,
        },
      ]);
      setIsBotThinking(false);
    }, 500);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        getAvatar,
        isBotThinking,
        spoofBotMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);

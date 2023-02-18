import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { useModalContext } from '@/contexts/ModalContext';

export type Message = {
  actor: string;
  payload: string;
};

// type UserMessage = Omit<Message, 'avatar'>;

export type ChatContextType = {
  messages: Message[];
  sendMessage: (msg: string) => void;
  spoofBotMessage: (msg: string) => void;
  getAvatar: (actor: string) => string;
  isBotThinking: boolean;
};

const userAvatar = 'https://i.pravatar.cc/150?img=56';
const botAvatar = 'https://i.pravatar.cc/150?img=32';
const systemAvatar = 'https://i.pravatar.cc/150?img=58';
const getAvatar = (actor: string) =>
  actor == 'bot' ? botAvatar : actor == 'user' ? userAvatar : systemAvatar;

const initialContext = {
  messages: [
    {
      actor: 'bot',
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
    const q = window.location.search;
    if (q) {
      wsSendMessage({ actor: 'system', type: 'init', payload: q });
    }
  }, []);

  useEffect(() => {
    if (!lastMessage) return;
    const obj = JSON.parse(lastMessage.data);
    const payload = obj.payload;
    const actor = obj.actor;
    if (obj.type == 'uuid') {
      window.history.replaceState(null, '', `?s=${obj.payload}`);
      return;
    }
    setIsBotThinking(obj.stillThinking);
    const msg = {
      payload,
      actor,
    };
    setMessages((messages) => {
      if (obj.operation == 'append') {
        const lastMsg = messages[messages.length - 1];
        const appendedMsg = {
          payload: lastMsg.payload + msg.payload,
          actor: lastMsg.actor,
        };
        return [...messages.slice(0, -1), appendedMsg];
      } else if (obj.operation == 'replace') {
        return [...messages.slice(0, -1), msg];
      } else {
        return [...messages, msg];
      }
    });
  }, [lastMessage]);

  const sendMessage = (msg: string) => {
    setIsBotThinking(true);
    wsSendMessage({ actor: 'user', type: 'text', payload: msg });
    setMessages([
      ...messages,
      {
        actor: 'user',
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
          actor: 'bot',
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

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { JsonValue } from 'react-use-websocket/dist/lib/types';
import { useAccount } from 'wagmi';
import { useModalContext } from '@/contexts/ModalContext';
import { getBackendUrl } from '@/utils/backend';

export type Message = {
  messageId: string;
  actor: string;
  payload: string;
  feedback: string;
};

// type UserMessage = Omit<Message, 'avatar'>;

export type ChatContextType = {
  messages: Message[];
  sendMessage: (msg: string) => void;
  sendAction: (action: JsonValue) => void;
  spoofBotMessage: (msg: string) => void;
  isBotThinking: boolean;
  showDebugMessages: boolean;
  setShowDebugMessages: (arg0: boolean) => void;
};

const initialContext = {
  messages: [],
  sendMessage: (msg: string) => {},
  sendAction: (action: JsonValue) => {},
  spoofBotMessage: (msg: string) => {},
  isBotThinking: false,
  showDebugMessages: false,
  setShowDebugMessages: (arg0: boolean) => {},
};

const ChatContext = createContext<ChatContextType>(initialContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(initialContext.messages);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(initialContext.isBotThinking);
  const [lastBotMessageId, setLastBotMessageId] = useState<string | null>(null);
  const [showDebugMessages, setShowDebugMessages] = useState(initialContext.showDebugMessages);
  const { setModal } = useModalContext();

  const backendUrl = getBackendUrl();
  const { sendJsonMessage: wsSendMessage, lastMessage } = useWebSocket(backendUrl, {
    onOpen: (evt) => onOpen(),
    onClose: (evt) => onClose(),
    onError: (evt) => onError(),
    shouldReconnect: (closeEvent) => true,
    reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
  });

  // Connected wallet status
  const {
    isConnected: walletIsConnected,
    status: walletStatus,
    address: walletAddress,
  } = useAccount();
  const sendWalletMessage = () => {
    const walletPayload = {
      walletIsConnected,
      walletStatus,
      walletAddress,
    };
    wsSendMessage({ actor: 'system', type: 'wallet', payload: walletPayload });
  };
  useEffect(() => {
    sendWalletMessage();
  }, [walletIsConnected, walletStatus, walletAddress]);

  const onOpen = () => {
    console.log(`Connected to backend: ${backendUrl}`);

    const q = window.location.search;
    if (q) {
      // websocket is re-establishing an existing session
      const params = new URLSearchParams(q);
      if (params.get('s')) {
        // load the historical session stored within the backend
        const payload = {
          sessionId: params.get('s'),
          resumeFromMessageId: lastBotMessageId,
        };
        wsSendMessage({ actor: 'system', type: 'init', payload: payload });
      }
      if (params.get('cfg')) {
        // set the system config to use on the backend
        const payload = {
          systemConfigId: params.get('cfg'),
        };
        wsSendMessage({ actor: 'system', type: 'cfg', payload: payload });
      }
    }
    sendWalletMessage();
  };

  // unused in production, but useful in debugging
  const onClose = () => {
    // console.log('websocket closed');
  };

  const onError = () => {
    setModal(<div>Websocket error</div>);
  };

  useEffect(() => {
    if (!lastMessage) return;
    const obj = JSON.parse(lastMessage.data);
    const payload = obj.payload;
    const actor = obj.actor;
    if (obj.type == 'uuid') {
      const q = window.location.search;
      const params = new URLSearchParams(q);
      params.set('s', obj.payload);
      window.history.replaceState(null, '', '?' + params.toString());
      return;
    }
    setIsBotThinking(obj.stillThinking);
    setLastBotMessageId(obj.messageId);
    const msg = {
      messageId: obj.messageId || '',
      payload,
      actor,
      feedback: obj.feedback || 'none',
    };
    setMessages((messages) => {
      if (obj.operation == 'append') {
        const lastMsg = messages[messages.length - 1];
        const appendedMsg = {
          messageId: lastMsg.messageId,
          payload: lastMsg.payload + msg.payload,
          actor: lastMsg.actor,
          feedback: lastMsg.feedback,
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
        messageId: '',
        actor: 'user',
        payload: msg,
        feedback: 'n/a',
      },
    ]);
  };

  const sendAction = (action: JsonValue) => {
    wsSendMessage({ actor: 'user', type: 'action', payload: action });
  };

  const spoofBotMessage = (msg: string) => {
    setIsBotThinking(true);
    setTimeout(() => {
      setMessages([
        ...messages,
        {
          messageId: '',
          actor: 'bot',
          payload: msg,
          feedback: 'n/a',
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
        sendAction,
        isBotThinking,
        spoofBotMessage,
        showDebugMessages,
        setShowDebugMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useWebSocket from 'react-use-websocket';
import { JsonValue } from 'react-use-websocket/dist/lib/types';
import { useAccount } from 'wagmi';
import { getBackendUrl } from '@/utils/backend';
import { useSession } from 'next-auth/react';

export type Message = {
  messageId: string;
  actor: string;
  payload: string;
  feedback: string;
};

export type TruncateOptions = {
  updatedText?: string;
  inclusive?: boolean;
  setBotThinking?: boolean;
};

export type ChatContextType = {
  messages: Message[];
  sendMessage: (msg: string) => void;
  replayUserMessage: (msg: string) => void;
  sendMultiStepClientMessage: (action: JsonValue) => void;
  setIsMultiStepInProgress: (value: boolean) => void;
  sendAction: (action: JsonValue) => void;
  truncateUntilNextHumanMessage: (messageId: string, options?: TruncateOptions) => string | null;
  spoofBotMessage: (msg: string) => void;
  isBotThinking: boolean;
  insertBeforeMessageId: string | null;
  setInsertBeforeMessageId: (arg0: string | null) => void;
  isMultiStepInProgress: boolean;
  showDebugMessages: boolean;
  setShowDebugMessages: (arg0: boolean) => void;
  interactor: string;
  setInteractor: (arg0: string) => void;

  siweVerify: (msg: string) => void;
  generateNonce: (msg: string) => void;
};

const initialContext = {
  messages: [],
  sendMessage: (msg: string) => {},
  replayUserMessage: (msg: string) => {},
  sendMultiStepClientMessage: (action: JsonValue) => {},
  setIsMultiStepInProgress: (value: boolean) => {},
  sendAction: (action: JsonValue) => {},
  truncateUntilNextHumanMessage: (messageId: string, options?: TruncateOptions) => {
    return null;
  },
  spoofBotMessage: (msg: string) => {},
  isBotThinking: false,
  insertBeforeMessageId: null,
  setInsertBeforeMessageId: (arg0: string | null) => {},
  isMultiStepInProgress: false,
  showDebugMessages: false,
  setShowDebugMessages: (arg0: boolean) => {},
  
  interactor: 'user',
  setInteractor: (arg0: string) => {},

  siweVerify: (msg: string) => {},
  generateNonce: (msg: string) => {},
};

const ChatContext = createContext<ChatContextType>(initialContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(initialContext.messages);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(initialContext.isBotThinking);
  const [isMultiStepInProgress, setIsMultiStepInProgress] = useState<boolean>(
    initialContext.isMultiStepInProgress
  );
  const [lastBotMessageId, setLastBotMessageId] = useState<string | null>(null);
  const [insertBeforeMessageId, setInsertBeforeMessageId] = useState<string | null>(null);
  const [showDebugMessages, setShowDebugMessages] = useState(initialContext.showDebugMessages);
  const [interactor, setInteractor] = useState<string>(initialContext.interactor);

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

  const { data: session, status } = useSession()
  useEffect(()=>{
    console.log( session, status)
  },[])

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
    // toast.info('Websocket closed');
  };

  const onError = () => {
    toast.error('Websocket Error', { autoClose: false, closeOnClick: true });
  };

  useEffect(() => {
    if (!lastMessage) return;
    const obj = JSON.parse(lastMessage.data);
    if (obj.type == 'uuid') {
      const q = window.location.search;
      const params = new URLSearchParams(q);
      params.set('s', obj.payload);
      window.history.replaceState(null, '', '?' + params.toString());
      return;
    }
    setIsBotThinking(obj.stillThinking);
    setLastBotMessageId(obj.messageId);
    const payload = obj.payload;
    const actor = obj.actor;
    const beforeMessageId = obj.beforeMessageId || null;
    setInsertBeforeMessageId(beforeMessageId);
    const msg = {
      messageId: obj.messageId || '',
      payload,
      actor,
      feedback: obj.feedback || 'none',
    };
    setMessages((messages) => {
      // if beforeMessageId is specified, then we are inserting new messages before that point.
      // break up our existing message list into 2 parts, those before the insertion point,
      // and those after.
      const idx = beforeMessageId
        ? messages.findIndex((message) => message.messageId === beforeMessageId)
        : -1;
      const beforeMessages = idx >= 0 ? messages.slice(0, idx) : messages;
      const afterMessages = idx >= 0 ? messages.slice(idx) : [];
      if (obj.operation == 'append') {
        const lastMsg = beforeMessages[beforeMessages.length - 1];
        const appendedMsg = {
          messageId: lastMsg.messageId,
          payload: lastMsg.payload + msg.payload,
          actor: lastMsg.actor,
          feedback: lastMsg.feedback,
        };
        return [...beforeMessages.slice(0, -1), appendedMsg, ...afterMessages];
      } else if (obj.operation == 'replace' || obj.operation == 'create_then_replace') {
        // replace most recent
        return [...beforeMessages.slice(0, -1), msg, ...afterMessages];
      } else {
        return [...beforeMessages, msg, ...afterMessages];
      }
    });
  }, [lastMessage]);

  const sendMessage = (msg: string) => {
    setInsertBeforeMessageId(null);
    if (interactor === 'user') {
      setIsBotThinking(true);
    }
    wsSendMessage({ actor: interactor, type: 'text', payload: msg });
    setMessages([
      ...messages,
      {
        messageId: '',
        actor: interactor,
        payload: msg,
        feedback: 'n/a',
      },
    ]);
  };

  const replayUserMessage = useCallback(
    (msg: string) => {
      setIsBotThinking(true);
      wsSendMessage({ actor: 'system', type: 'replay-user-msg', payload: msg });
    },
    [wsSendMessage]
  );

  const sendMultiStepClientMessage = useCallback(
    (payload: JsonValue) => {
      wsSendMessage({ actor: 'system', type: 'multistep-workflow', payload });
    },
    [wsSendMessage]
  );

  const sendAction = (action: JsonValue) => {
    wsSendMessage({ actor: 'user', type: 'action', payload: action });
  };

  const truncateUntilNextHumanMessage = (
    messageId: string,
    options?: TruncateOptions
  ): string | null => {
    if (options?.setBotThinking) {
      setIsBotThinking(true);
    }
    const idx = messages.findIndex((message) => message.messageId === messageId);
    const beforeMessages = idx >= 0 ? messages.slice(0, idx + (options?.inclusive ? 0 : 1)) : [];
    if (options?.updatedText && !options?.inclusive) {
      beforeMessages[beforeMessages.length - 1].payload = options.updatedText;
    }
    const afterMessages = messages.slice(idx + 1);
    const afterIdx = afterMessages.findIndex(
      (message) => message.actor === 'user' || message.actor === 'commenter'
    );
    const remainingMessages = afterIdx >= 0 ? afterMessages.slice(afterIdx) : [];
    const nextUserMessageId = afterMessages.length > 0 ? afterMessages[0].messageId : null;
    setMessages([...beforeMessages, ...remainingMessages]);
    return nextUserMessageId;
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

  const generateNonce = (msg:string) => { 
    wsSendMessage({ actor: 'system', type: 'get-nonce', payload: msg });
  }

  const siweVerify = (msg:string) => { 
    wsSendMessage({ actor: 'system', type: 'siwe-verify', payload: msg });
  }

  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        replayUserMessage,
        sendMultiStepClientMessage,
        sendAction,
        isBotThinking,
        insertBeforeMessageId,
        setInsertBeforeMessageId,
        isMultiStepInProgress,
        setIsMultiStepInProgress,
        truncateUntilNextHumanMessage,
        spoofBotMessage,
        showDebugMessages,
        setShowDebugMessages,
        interactor,
        setInteractor,
        siweVerify,
        generateNonce,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;

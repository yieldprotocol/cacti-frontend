import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { getBackendWebsocketUrl } from '@/utils/backend';

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

type JSONPrimitive = string | number | boolean | null;
interface JSONObject {
  [key: string]: JSONValue;
}
type JSONArray = JSONValue[];
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;

export type ChatContextType = {
  messages: Message[];
  sendMessage: (msg: string) => void;
  replayUserMessage: (msg: string) => void;
  sendMultiStepClientMessage: (action: any) => void;
  setIsMultiStepInProgress: (value: boolean) => void;
  sendAction: (action: JSONValue) => void;
  truncateUntilNextHumanMessage: (messageId: string, options?: TruncateOptions) => string | null;
  spoofBotMessage: (msg: string) => void;
  isBotThinking: boolean;
  insertBeforeMessageId: string | null;
  setInsertBeforeMessageId: (arg0: string | null) => void;
  isMultiStepInProgress: boolean;

  interactor: string;
  setInteractor: (arg0: string) => void;
  connectionStatus: ReadyState;

  showDebugMessages: boolean;
  setShowDebugMessages: (arg0: boolean) => void;

  showShareModal: boolean;
  setShowShareModal: (value: boolean) => void;
};

const initialContext = {
  messages: [],
  sendMessage: (msg: string) => {},
  replayUserMessage: (msg: string) => {},
  sendMultiStepClientMessage: (action: JSONValue) => {},
  setIsMultiStepInProgress: (value: boolean) => {},
  sendAction: (action: JSONValue) => {},
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
  connectionStatus: ReadyState.UNINSTANTIATED,

  showShareModal: false,
  setShowShareModal: (value: boolean) => {},
};

const ChatContext = createContext<ChatContextType>(initialContext);

export const ChatContextProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>(initialContext.messages);
  const [isBotThinking, setIsBotThinking] = useState<boolean>(initialContext.isBotThinking);
  const [isMultiStepInProgress, setIsMultiStepInProgress] = useState<boolean>(
    initialContext.isMultiStepInProgress
  );
  const [resumeFromMessageId, setResumeFromMessageId] = useState<string | null>(null);
  const [insertBeforeMessageId, setInsertBeforeMessageId] = useState<string | null>(null);
  const [showDebugMessages, setShowDebugMessages] = useState(initialContext.showDebugMessages);
  const [interactor, setInteractor] = useState<string>(initialContext.interactor);

  const [showShareModal, setShowShareModal] = useState<boolean>(initialContext.showShareModal);

  const [connectionStatus, setConnectionStatus] = useState<ReadyState>(ReadyState.UNINSTANTIATED);
  const [lastInitSessionId, setLastInitSessionId] = useState<string | null>(null);
  const [lastAuthStatus, setLastAuthStatus] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { status } = useSession();
  // shouldConnect can be true for logged out to view public sessions, but we want to
  // enforce a disconnect and reconnect when the auth status changes, so
  // that the websocket will end up using the latest cookie state
  const shouldConnect = status == lastAuthStatus;
  const backendUrl = getBackendWebsocketUrl();
  const {
    sendJsonMessage: wsSendMessage,
    lastMessage,
    readyState,
  } = useWebSocket(
    backendUrl,
    {
      onOpen: (evt) => onOpen(),
      onClose: (evt) => onClose(),
      shouldReconnect: (closeEvent) => true,
      reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
    },
    shouldConnect
  );

  const router = useRouter();
  const sessionId = router.query.id
    ? typeof router.query.id === 'string'
      ? router.query.id
      : router.query.id?.[0]
    : null;

  const resetMessages = () => {
    setMessages([]);
    setResumeFromMessageId(null);
    setInsertBeforeMessageId(null);
  };

  useEffect(() => {
    // re-initialize on change
    if (status === 'loading') {
      return;
    }
    let needsReset = false;
    // check both changes below in one pass because the hook might not
    // fire again if both things change at the same time
    if (status != lastAuthStatus) {
      setLastAuthStatus(status);
      needsReset = true;
    }
    if (sessionId != lastInitSessionId) {
      setLastInitSessionId(sessionId);
      needsReset = true;
    }
    if (needsReset) {
      resetMessages();
      wsSendMessage({ actor: 'system', type: 'clear', payload: {} });
      if (sessionId) {
        wsSendMessage({ actor: 'system', type: 'init', payload: { sessionId } });
      }
    }
  }, [status, sessionId, wsSendMessage]); // note: don't add lastAuthStatus, lastInitSessionId here

  const onOpen = () => {
    console.log(`Connected to backend: ${backendUrl}`);

    // If we reconnected, and have some expectation of where to resume from, re-initialize
    if (
      sessionId &&
      sessionId == lastInitSessionId &&
      messages.length > 0 &&
      (resumeFromMessageId != null || insertBeforeMessageId != null)
    ) {
      wsSendMessage({
        actor: 'system',
        type: 'init',
        payload: { sessionId, resumeFromMessageId, insertBeforeMessageId },
      });
    }

    // set the system config to use on the backend
    const q = window.location.search;
    if (q) {
      const params = new URLSearchParams(q);
      if (params.get('cfg')) {
        // set the system config to use on the backend
        const payload = {
          systemConfigId: params.get('cfg'),
        };
        wsSendMessage({ actor: 'system', type: 'cfg', payload: payload });
      }
    }
  };

  /* monitor ready state and update connectionStatus accordingly */
  useEffect(() => {
    setConnectionStatus(readyState);
  }, [readyState]);

  // unused in production, but useful in debugging
  const onClose = () => {
    console.log('Websocket closed');
    setIsBotThinking(false);
    // toast.info('Websocket closed');
  };

  const onError = () => {
    // toast.error('Websocket Error', { autoClose: false, closeOnClick: true });
  };

  useEffect(() => {
    if (!lastMessage) return;

    const obj = JSON.parse(lastMessage.data);
    if (obj.type == 'clear') {
      resetMessages();
      return;
    } else if (obj.type == 'uuid') {
      const newSessionId = obj.payload;
      setLastInitSessionId(newSessionId);
      router.replace(`/chat/${newSessionId}`);
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      return;
    }

    setIsBotThinking(obj.stillThinking);
    setResumeFromMessageId(obj.messageId);
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

    // determine if we should bump timestamp: when there is activity besides streaming (append)
    if (
      obj.operation == 'create' ||
      obj.operation == 'replace' ||
      obj.operation == 'create_then_replace'
    ) {
      queryClient.invalidateQueries({ queryKey: ['chatSettings', sessionId] });
    }
  }, [lastMessage, queryClient, router]);

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
    (payload: JSONValue) => {
      wsSendMessage({ actor: 'system', type: 'multistep-workflow', payload });
    },
    [wsSendMessage]
  );

  const sendAction = useCallback(
    (action: JSONValue) => {
      wsSendMessage({ actor: 'user', type: 'action', payload: action });
    },
    [wsSendMessage]
  );

  const truncateUntilNextHumanMessage = (
    messageId: string,
    options?: TruncateOptions
  ): string | null => {
    // we truncate our message list from messageId (exclusive by default
    // unless options.inclusive is set) until next human message (exclusive)
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
    const nextUserMessageId = remainingMessages.length > 0 ? remainingMessages[0].messageId : null;

    // check if we need to update resumeFromMessageId, if it is one of the removed messages
    if (resumeFromMessageId !== null) {
      const resumeFromMessageIdx = afterMessages.findIndex(
        (message) => message.messageId === resumeFromMessageId
      );
      if (resumeFromMessageIdx >= 0) {
        // if it is removed, we set it to the current human message, so if there
        // is any error and we reconnect, we only try to resume messages from
        // there, instead of what it was before it got deleted.
        setResumeFromMessageId(messageId);
      }
    }

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
        connectionStatus,

        showShareModal,
        setShowShareModal,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;

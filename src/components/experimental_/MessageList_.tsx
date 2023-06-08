import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { BotThinking } from './BotThinking';
import { ChatHeader } from './ChatHeader';
import { MessageItem } from './MessageItem_';

export const MessageList = () => {
  const {
    messages,
    isBotThinking,
    showDebugMessages,
    insertBeforeMessageId,
    isMultiStepInProgress,
  } = useChatContext();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const multiStepInProgress = isMultiStepInProgress && (
    <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
      <span className="after:animate-ellipse">Multi-step workflow in progress</span>
    </div>
  );

  const bottomRefDiv = <div ref={bottomRef}></div>;

  return (
    <div className="h-full">
      {messages.map((message, i) => {
        if (!showDebugMessages && message.actor == 'system') {
          return <React.Fragment key={message.messageId} />;
        }

        return (
          <React.Fragment key={message.messageId}>
            {message.messageId == insertBeforeMessageId && (
              <>
                {bottomRefDiv}
                {multiStepInProgress}
                {isBotThinking ? <BotThinking /> : null}
              </>
            )}
            <MessageItem message={message} />
          </React.Fragment>
        );
      })}

      {!insertBeforeMessageId && (
        <>
          {multiStepInProgress}
          {isBotThinking ? <BotThinking /> : null}
          {bottomRefDiv}
        </>
      )}
    </div>
  );
};

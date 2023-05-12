import React, { useEffect, useRef } from 'react';
import { MessageItem, MessageItemWrap } from './MessageItem';
import { useChatContext } from '@/contexts/ChatContext';

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

  const botThinking = isBotThinking && (
    <MessageItemWrap actor={'Bot'}>
      <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        <span className="after:animate-ellipse">Bot is thinking</span>
      </div>
    </MessageItemWrap>
  );

  const multiStepInProgress = isMultiStepInProgress && (
    <MessageItemWrap actor={'Bot'}>
      <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        <span className="after:animate-ellipse">Multi-step workflow in progress</span>
      </div>
    </MessageItemWrap>
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
                {botThinking}
              </>
            )}
            <MessageItem message={message} />
          </React.Fragment>
        );
      })}
      {!insertBeforeMessageId && (
        <>
          {multiStepInProgress}
          {botThinking}
          {bottomRefDiv}
        </>
      )}
    </div>
  );
};

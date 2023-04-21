import React, { useEffect, useRef } from 'react';
import { MessageItem, MessageItemWrap } from '@/components/MessageItem';
import { useChatContext } from '@/contexts/ChatContext';
import Avatar from './Avatar';

export const MessageList = () => {
  const { messages, isBotThinking, showDebugMessages, multiStepInProgress } = useChatContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full">
      {messages.map((message, i) => {
        if (!showDebugMessages && message.actor == 'system') {
          return <React.Fragment key={i} />;
        }
        return <MessageItem key={`m${i}`} message={message} />;
      })}
      {multiStepInProgress && (
        <MessageItemWrap actor={'Bot'}>
          <Avatar actor={'Bot'} />
          <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
            <span className="after:animate-ellipse">Multi-step workflow in progress...</span>
          </div>
        </MessageItemWrap>
      )}
      {isBotThinking && (
        <MessageItemWrap actor={'Bot'}>
          <Avatar actor={'Bot'} />
          <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
            <span className="after:animate-ellipse">Bot is thinking</span>
          </div>
        </MessageItemWrap>
      )}
      <div ref={bottomRef}></div>
    </div>
  );
};

import React, { useEffect, useRef } from 'react';
import { MessageItem, MessageItemWrap } from '@/components/MessageItem';
import { useChatContext } from '@/contexts/ChatContext';
import Avatar from './Avatar';

export const MessageList = () => {
  const { messages, isBotThinking, showDebugMessages, insertBeforeMessageId } = useChatContext();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const botThinking = isBotThinking && (
    <MessageItemWrap actor={'Bot'}>
      <Avatar actor={'Bot'} />
      <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        <span className="after:animate-ellipse">Bot is thinking</span>
      </div>
    </MessageItemWrap>
  );
  const bottomRefDiv = <div ref={bottomRef}></div>;

  return (
    <div className="h-full">
      {messages.map((message, i) => {
        if (!showDebugMessages && message.actor == 'system') {
          return <React.Fragment key={i} />;
        }
        return (
          <React.Fragment key={i}>
            {message.messageId == insertBeforeMessageId && (
              <>
                {bottomRefDiv}
                {botThinking}
              </>
            )}
            <MessageItem key={`m${i}`} message={message} />
          </React.Fragment>
        );
      })}
      {!insertBeforeMessageId && (
        <>
          {botThinking}
          {bottomRefDiv}
        </>
      )}
    </div>
  );
};

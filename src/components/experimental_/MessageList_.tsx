import React, { useEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import { BotThinking } from './BotThinking';
import { MessageItem } from './MessageItem_';
import { MultiStepProgressIndicator } from './MultiStepProgressIndicator';

const MessageList = () => {
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

  const multiStepInProgress = isMultiStepInProgress ? (
    <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
      <span className="after:animate-ellipse">Multi-step workflow in progress</span>
    </div>
  ) : null;

  const bottomRefDiv = <div ref={bottomRef}></div>;

  return (
    <div className="h-full w-full pt-8">
      {messages.map((message) => {
        if (!showDebugMessages && (message.actor === 'system' || message.actor === 'function')) {
          return <React.Fragment key={message.messageId} />;
        }

        return (
          <React.Fragment key={message.messageId}>
            {message.messageId == insertBeforeMessageId && (
              <>
                {bottomRefDiv}
                <ProgressIndicators
                  isBotThinking={isBotThinking}
                  isMultiStepInProgress={isMultiStepInProgress}
                  bottomRef={bottomRef}
                />
              </>
            )}
            <MessageItem message={message} />
          </React.Fragment>
        );
      })}

      {!insertBeforeMessageId ? (
        <>
          <ProgressIndicators
            isBotThinking={isBotThinking}
            isMultiStepInProgress={isMultiStepInProgress}
            bottomRef={bottomRef}
          />
          {bottomRefDiv}
        </>
      ) : null}
    </div>
  );
};

const ProgressIndicators = ({
  isBotThinking,
  isMultiStepInProgress,
  bottomRef,
}: {
  isBotThinking: boolean;
  isMultiStepInProgress: boolean;
  bottomRef: React.RefObject<HTMLDivElement>;
}) => {
  useEffect(() => {
    if (isMultiStepInProgress) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isMultiStepInProgress, bottomRef]);

  return (
    <>
      {isMultiStepInProgress ? <MultiStepProgressIndicator /> : null}
      {isBotThinking ? <BotThinking /> : null}
    </>
  );
};

export default MessageList;

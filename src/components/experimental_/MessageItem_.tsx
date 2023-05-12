import { ReactNode } from 'react';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { FeedbackButton } from './FeedbackButton_';
import { MessageTranslator } from './MessageTranslator_';
import { SystemMessage } from './SystemMessage_';
import { UserMessage } from './UserMessage_';

export const MessageItemWrap = ({ actor, children }: { actor: string; children: ReactNode }) => {
  return (
    <div className={`m-auto flex items-start gap-4 p-2 md:gap-6 md:px-40 lg:px-64`}>{children}</div>
  );
};

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload, messageId } = message;
  const { sendAction, truncateUntilNextHumanMessage, setInsertBeforeMessageId } = useChatContext();

  const submitEdit = (text: string) => {
    sendAction({ actionType: 'edit', messageId, text }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, {
      updatedText: text,
      setBotThinking: actor === 'user',
    });
    setInsertBeforeMessageId(beforeMessageId);
  };

  const submitRegenerate = () => {
    sendAction({ actionType: 'regenerate', messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { setBotThinking: true });
    setInsertBeforeMessageId(beforeMessageId);
  };

  const submitDelete = () => {
    sendAction({ actionType: 'delete', messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { inclusive: true });
    setInsertBeforeMessageId(beforeMessageId);
  };

  return (
    <MessageItemWrap actor={actor}>
      <div className={`flex w-[90%] flex-col`}>
        {actor === 'bot' && <MessageTranslator message={payload} />}
        {actor === 'system' && <SystemMessage message={payload} />}
        {actor === 'user' && (
          <UserMessage
            {...{
              initialText: payload,
              submitEdit,
              submitRegenerate,
              submitDelete,
            }}
          />
        )}
      </div>
      {actor === 'bot' && (
        <div className="w-[10%]">
          {' '}
          <FeedbackButton message={message} />{' '}
        </div>
      )}
      {actor === 'user' && <div className="w-[10%]" />}
      {actor === 'system' && <div className="w-[10%]" />}
    </MessageItemWrap>
  );
};

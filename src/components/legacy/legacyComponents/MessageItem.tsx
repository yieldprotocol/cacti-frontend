import { ReactNode } from 'react';
import Avatar from '@/components/shared/Avatar';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { FeedbackButton } from './FeedbackButton';
import { MessageTranslator } from './MessageTranslator';
import { SystemMessage } from './SystemMessage';
import { UserMessage } from './UserMessage';

export const MessageItemWrap = ({ actor, children }: { actor: string; children: ReactNode }) => {
  return (
    <div className={`${actor !== 'user' && 'bg-gray-600'}`}>
      <div
        className={`group m-auto flex max-w-5xl items-start gap-2 p-4 text-base md:gap-6 ${
          actor !== 'user' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'
        }`}
      >
        {children}
      </div>
    </div>
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
      <Avatar actor={actor} />
      <div className="relative flex grow flex-col gap-1 md:gap-3">
        {actor === 'bot' ? (
          <MessageTranslator message={payload} />
        ) : actor === 'system' ? (
          <SystemMessage message={payload} />
        ) : actor === 'function' ? (
          <SystemMessage message={payload} />
        ) : (
          <UserMessage
            {...{
              actor,
              initialText: payload,
              submitEdit,
              submitRegenerate,
              submitDelete,
            }}
          />
        )}
      </div>
      {actor === 'bot' && <FeedbackButton message={message} />}
    </MessageItemWrap>
  );
};

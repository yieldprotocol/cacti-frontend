import { ReactNode } from 'react';
import clsx from 'clsx';
import Avatar from '@/components/Avatar';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { SystemMessage } from '@/components/SystemMessage';
import { UserMessage } from '@/components/UserMessage';
import { Message, useChatContext } from '@/contexts/ChatContext';

export const MessageItemWrap = ({ actor, children }: { actor: string; children: ReactNode }) => {
  return (
    <div
      className={clsx(
        'group m-auto flex max-w-5xl items-start gap-2 p-4 text-base md:gap-6',
        actor != 'user' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'
      )}
    >
      {children}
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

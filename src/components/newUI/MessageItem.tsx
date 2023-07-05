import { ReactNode } from 'react';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { FeedbackButton } from './FeedbackButton';
import MessageTranslator from './MessageTranslator';
import { SystemMessage } from './SystemMessage';
import { UserMessage } from './UserMessage';

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload, messageId } = message;
  const { sendAction, truncateUntilNextHumanMessage, setInsertBeforeMessageId } = useChatContext();

  const isUser = actor === 'user' || actor === 'commenter';

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
    <div className={`flex w-full flex-col py-2`}>
      {actor === 'bot' && <MessageTranslator message={message} />}
      {actor === 'system' && <SystemMessage message={payload} />}
      {actor === 'function' && <SystemMessage message={payload} />}
      {isUser && (
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
  );
};

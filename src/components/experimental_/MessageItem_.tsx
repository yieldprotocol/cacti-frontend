import { ReactNode } from 'react';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { FeedbackButton } from './FeedbackButton_';
import MessageTranslator from './MessageTranslator_';
import { SystemMessage } from './SystemMessage_';
import { UserMessage } from './UserMessage_';

export const MessageItem = ({
  message,
  isShare = false,
}: {
  message: Message;
  isShare?: boolean;
}) => {
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
    <div className="mb-4">
      {actor === 'bot' && <MessageTranslator message={message} />}
      {(actor === 'system' || actor === 'function') && <SystemMessage message={payload} />}
      {(actor === 'user' || actor === 'commenter') && (
        <UserMessage
          {...{
            actor,
            initialText: payload,
            submitEdit,
            submitRegenerate,
            submitDelete,
            isShare,
          }}
        />
      )}
    </div>
  );
};

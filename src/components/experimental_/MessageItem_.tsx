import { ReactNode } from 'react';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { FeedbackButton } from './FeedbackButton_';
import { MessageTranslator } from './MessageTranslator_';
import { SystemMessage } from './SystemMessage_';
import { UserMessage } from './UserMessage_';

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
    <div className={`flex py-2`}>
      <div className={`flex w-full flex-col py-[1px]`}>
        {actor === 'bot' && <MessageTranslator message={payload} />}
        {actor === 'system' && <SystemMessage message={payload} />}
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
      {actor === 'bot' && (
        <div className="w-[10%]">
          <FeedbackButton message={message} />
        </div>
      )}
      {actor === 'system' && <div className="w-[10%]" />}
      {isUser && <div className="w-[10%]" />}
    </div>
  );
};
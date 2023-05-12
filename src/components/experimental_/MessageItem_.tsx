import { ReactNode } from 'react';
import { FeedbackButton } from '@/components/FeedbackButton';
import { SystemMessage } from '@/components/SystemMessage';
import { UserMessage } from '@/components/UserMessage';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { MessageTranslator } from './MessageTranslator_';

export const MessageItemWrap = ({ actor, children }: { actor: string; children: ReactNode }) => {
  return (
    <div className={`m-auto flex items-start gap-4 p-4 px-4 py-4 text-base md:gap-6 md:px-40 lg:px-64`}>
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
      <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        {actor === 'bot' && <MessageTranslator message={payload} />}
        {actor === 'system' && <SystemMessage message={payload} />}
        {actor === 'user' && (
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

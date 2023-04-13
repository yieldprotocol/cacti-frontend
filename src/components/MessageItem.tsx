import { ReactNode, useState } from 'react';
import Avatar from '@/components/Avatar';
import { CancelButton } from '@/components/CancelButton';
import { EditButton } from '@/components/EditButton';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { SubmitButton } from '@/components/SubmitButton';
import { SystemMessage } from '@/components/SystemMessage';
import { UserMessage } from '@/components/UserMessage';
import { Message, useChatContext } from '@/contexts/ChatContext';

export const MessageItemWrap = ({ actor, children }: { actor: string; children: ReactNode }) => {
  return (
    <div
      className={`
      m-auto flex items-start gap-4 p-4 py-4 px-4 text-base md:gap-6 md:px-40 lg:px-64
       ${actor != 'user' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'}`}
    >
      {children}
    </div>
  );
};

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload, messageId } = message;
  const { sendAction, truncateAndSendMessage } = useChatContext();
  const [text, setText] = useState(payload);
  const [isEditing, setIsEditing] = useState(false);

  // These only apply for user messages
  const startEdit = () => {
    setIsEditing(true);
  };
  const submitEdit = () => {
    // make this just do truncation
    sendAction({ actionType: 'edit', messageId });
    truncateAndSendMessage(messageId, text);
    setIsEditing(false);
  };
  const cancelEdit = () => {
    setText(payload);
    setIsEditing(false);
  };

  return (
    <MessageItemWrap actor={actor}>
      <Avatar actor={actor} />
      <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        {actor === 'bot' ? (
          <MessageTranslator message={payload} />
        ) : actor === 'system' ? (
          <SystemMessage message={payload} />
        ) : (
          <UserMessage
            {...{
              initialText: payload,
              text,
              isEditing,
              cancelEdit,
              setText,
            }}
          />
        )}
        {actor === 'user' && isEditing && (
          <div
            className={`m-auto flex items-start gap-4 p-4 py-2 px-4 text-base md:gap-6 md:px-40 lg:px-64`}
          >
            <SubmitButton onClick={submitEdit} />
            <CancelButton onClick={cancelEdit} />
          </div>
        )}
      </div>
      {actor === 'bot' && <FeedbackButton message={message} />}
      {actor === 'user' && !isEditing && <EditButton onClick={startEdit} />}
    </MessageItemWrap>
  );
};

import Avatar from '@/components/Avatar';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { Message } from '@/contexts/ChatContext';

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload } = message;

  return (
    <div
      className={`
      m-auto flex items-start gap-4 p-4 py-4 px-4 text-base md:gap-6 md:px-40 lg:px-64
       ${actor != 'user' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'}`}
    >
      <Avatar actor={actor} />
      <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        <MessageTranslator message={payload} />
      </div>
      <FeedbackButton message={message} />
    </div>
  );
};

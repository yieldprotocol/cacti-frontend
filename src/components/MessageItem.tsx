import Avatar from '@/components/Avatar';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { Message } from '@/contexts/ChatContext';

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload } = message;

  return (
    <div
      className={`flex items-start py-4 px-4 lg:px-64 ${
        actor != 'user' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'
      }`}
    >
      <Avatar actor={actor} />
      <div className={`text-md w-full overflow-hidden rounded-md pl-4 leading-7`}>
        <MessageTranslator message={payload} />
        <FeedbackButton message={message} />
      </div>
    </div>
  );
};

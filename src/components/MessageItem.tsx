import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { Message, useChatContext } from '@/contexts/ChatContext';

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload } = message;
  const { getAvatar } = useChatContext();

  const avatar = getAvatar(actor);
  return (
    <div
      className={`flex items-start py-4 px-4 lg:px-64 ${
        actor != 'user' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'
      }`}
    >
      <img
        src={avatar}
        alt={actor != 'user' ? `${actor} avatar` : 'My avatar'}
        className="h-10 w-10"
      />
      <div className={`text-md w-full overflow-hidden rounded-md pl-4 leading-7`}>
        <MessageTranslator message={payload} />
        <FeedbackButton message={message} />
      </div>
    </div>
  );
};

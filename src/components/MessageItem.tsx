import { Message, useChatContext } from '@/contexts/ChatContext';
import { MessageTranslator } from './MessageTranslator';

export const MessageItem = ({ message }: { message: Message }) => {
  const { isBot, payload } = message;
  const { getAvatar } = useChatContext();

  const avatar = getAvatar(isBot);
  return (
    <div className={`flex ${isBot ? '' : 'ml-auto flex-row-reverse'}`}>
      <img
        src={avatar}
        alt={isBot ? 'Bot avatar' : 'My avatar'}
        className="h-10 w-10 rounded-full"
      />
      <div
        className={`mx-2 overflow-hidden rounded-md p-2 text-sm ${
          isBot ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white'
        }`}
      >
        <MessageTranslator message={payload} />
      </div>
    </div>
  );
};

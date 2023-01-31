import { Message, useChatContext } from '@/contexts/ChatContext';

export const MessageItem = ({ message }: { message: Message }) => {
  const { isBot, payload } = message;
  const { getAvatar } = useChatContext();

  const avatar = getAvatar(isBot);
  return (
    <div
      className={`flex items-start py-4 px-64 ${
        isBot ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'
      }`}
    >
      <img src={avatar} alt={isBot ? 'Bot avatar' : 'My avatar'} className="h-10 w-10" />
      <div
        className={`text-md overflow-hidden rounded-md pl-4 leading-7`}
        dangerouslySetInnerHTML={{ __html: payload }}
      ></div>
    </div>
  );
};

import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';

export const ChatBox = () => {
  return (
    <div className="flex flex-col justify-between overflow-y-auto bg-gray-700">
      <div className="">
        <MessageList />
      </div>
      <div className="relative bottom-0 py-4 px-64">
        <MessageInput />
      </div>
    </div>
  );
};

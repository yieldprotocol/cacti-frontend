import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';

export const ChatBox = () => {
  return (
    <div className="flex max-h-full min-h-full flex-col justify-between pt-20 ">
      <div className="min-h-full overflow-auto">
        <MessageList />
      </div>
      <div className="w-full py-5 md:px-64">
        <MessageInput />
      </div>
    </div>
  );
};

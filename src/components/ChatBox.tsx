import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';

export const ChatBox = () => {
  return (
    <div className="flex h-full justify-center">
      <div className="mb-10 flex max-h-full w-full flex-col justify-between rounded-md bg-white">
        <div className="w-full overflow-auto rounded-lg">
          <MessageList />
        </div>
        <div className="p-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

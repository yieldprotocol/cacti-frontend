import { MessageInput } from "@/components/MessageInput";
import { MessageList } from "@/components/MessageList";

export const ChatBox = () => {
  return (
    <div className="flex justify-center h-full">
      <div className="flex flex-col rounded-md w-full max-h-full bg-white justify-between mb-10">
        <div className="rounded-lg w-full overflow-auto">
          <MessageList />
        </div>
        <div className="p-4">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

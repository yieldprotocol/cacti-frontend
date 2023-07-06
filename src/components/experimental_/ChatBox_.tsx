import { useRouter } from 'next/router';
import { useQueryChats } from '@/api/queries';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
// Use experimental components
import { MessageInput } from './MessageInput_';
import { MessageList } from './MessageList_';
import WelcomeMessage from './WelcomeMessage_';

const ChatBox = () => {
  const { messages } = useChatContext();
  const { isLoading } = useQueryChats();
  const router = useRouter();
  const { id } = router.query;
  const showMessageList = !!id && messages.length > 0;
  const messageContentComponent = showMessageList ? <MessageList /> : <WelcomeMessage />;

  return (
    <div className="flex h-full w-full flex-col gap-3">
      {/* chat area */}
      <div className="flex grow items-center justify-center overflow-auto pt-5">
        {isLoading ? <Spinner /> : messageContentComponent}
      </div>

      {/* Chat input */}
      <div className="fixed inset-x-0 bottom-0 flex w-full items-center bg-white/[0.01] px-2 py-4 backdrop-blur-xl lg:py-6">
        <div className="hidden lg:block lg:w-[15rem]" />
        <MessageInput />
      </div>
      <div className="w-full py-4 lg:py-6">
        <div className="h-14" />
      </div>
    </div>
  );
};

export default ChatBox;

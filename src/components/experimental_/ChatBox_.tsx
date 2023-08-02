import { useRouter } from 'next/router';
import { useQueryChats } from '@/api/chats/queries';
import { Spinner } from '@/utils';
import MessageInput from './MessageInput_';
import MessageList from './MessageList_';
// Use experimental components
import ShareChatModal from './ShareChatModal';
import WelcomeMessage from './WelcomeMessage_';

const ChatBox = () => {
  const { isLoading } = useQueryChats();
  const router = useRouter();
  const { id } = router.query;
  const messageContentComponent = !!id ? <MessageList /> : <WelcomeMessage />;

  return (
    <div className="relative flex h-full w-full flex-col overflow-auto">
      {/* chat sharing modal*/}
      <ShareChatModal id={id as string} />

      {/* chat area */}
      <div className="flex h-full w-full items-center justify-center overflow-auto pt-5">
        {isLoading ? <Spinner className="h-6 w-6" /> : messageContentComponent}
      </div>

      {/* Chat input */}
      <div className="sticky top-[100vh] flex w-full items-center justify-center justify-items-center bg-gray-secondary px-2 py-4 lg:py-6">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatBox;

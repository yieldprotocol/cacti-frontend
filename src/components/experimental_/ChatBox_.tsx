import { useRouter } from 'next/router';
import { useQueryChats } from '@/api/chats/queries';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import MessageInput from './MessageInput_';
import MessageList from './MessageList_';
// Use experimental components
import ShareChatModal from './ShareChatModal';
import WelcomeMessage from './WelcomeMessage_';

const ChatBox = () => {
  const { messages } = useChatContext();
  const { isLoading } = useQueryChats();
  const router = useRouter();
  const { id } = router.query;
  const showMessageList = !!id || messages.length > 0;
  const messageContentComponent = showMessageList ? <MessageList /> : <WelcomeMessage />;

  return (
    <div className="relative flex h-full w-full flex-col overflow-auto">
      {/* chat sharing modal*/}
      <ShareChatModal id={id as string} />

      {/* chat area */}
      <div className="flex h-full w-full items-center justify-center overflow-auto pt-5">
        {isLoading ? <Spinner /> : messageContentComponent}
      </div>

      {/* Chat input */}
      <div className="sticky top-[100vh] flex w-full items-center justify-center justify-items-center bg-gray-secondary px-2 py-4 lg:py-6">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatBox;

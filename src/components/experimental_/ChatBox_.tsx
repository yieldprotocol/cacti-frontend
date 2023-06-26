import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
// Use experimental components
import { MessageInput } from './MessageInput_';
import { MessageList } from './MessageList_';
import WelcomeMessage from './WelcomeMessage_';

const ChatBox = () => {
  const { messages } = useChatContext();
  const router = useRouter();
  const { s: threadId } = router.query;
  const showMessageList = messages.length > 0 || threadId;
  const messageContentComponent = showMessageList ? <MessageList /> : <WelcomeMessage />;
  const [ready, setReady] = useState(false);

  // This is needed to prevent differences in server side pre-rendering and client side
  // DOM rendering
  useEffect(() => setReady(router.isReady), [router.isReady]);

  return (
    <div className="flex h-full w-full flex-col">
      {/* chat area */}
      <div className="flex grow items-center justify-center overflow-auto pt-5">
        {ready ? messageContentComponent : <Spinner />}
      </div>

      {/* Chat input */}
      <div className="fixed inset-x-0 bottom-0 flex w-full items-center bg-white/[0.05] px-2 py-4 backdrop-blur-xl lg:py-6">
        <div className="hidden lg:block lg:w-[15rem]" />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatBox;

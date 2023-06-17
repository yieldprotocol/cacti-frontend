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
    <div className="flex justify-center min-h-screen">
      <div className="flex w-full flex-col">
        {/* chat area */}
        <div className="h-full overflow-auto">{ready ? messageContentComponent : <Spinner />}</div>

        {/* Chat input */}
        <div className="items-center bg-white/[0.05] backdrop-blur px-2 py-4 lg:py-6 sticky bottom-0">
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

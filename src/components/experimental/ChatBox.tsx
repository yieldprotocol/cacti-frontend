import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


import WelcomeMessage from '@/components/WelcomeMessage';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import { ResetButton } from '@/components/ResetButton';

// Use experimental components
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';

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
    <div className="flex max-h-full min-h-full flex-col justify-between pt-20 ">
      <div className="min-h-full overflow-auto">
        {ready ? messageContentComponent : <Spinner />}
      </div>

      <div className="grid w-full grid-cols-12 gap-2 py-5">
        <div className="col-span-2" />
        <div className="col-span-8">
          <MessageInput />
        </div>
        <div className="col-span-2 px-8">
          <ResetButton styleOption="iconAndText" />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

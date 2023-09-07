import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ResetButton } from '@/components/devTools/ResetButton';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import { MessageInput } from './MessageInput';
import { MessageList } from './MessageList';
import WelcomeMessage from './WelcomeMessage';

const ChatBox = () => {
  const { messages } = useChatContext();
  const router = useRouter();
  const showMessageList = messages.length > 0;
  const messageContentComponent = showMessageList ? <MessageList /> : <WelcomeMessage />;
  const [ready, setReady] = useState(false);
  // This is needed to prevent differences in server side pre-rendering and client side
  // DOM rendering
  useEffect(() => setReady(router.isReady), [router.isReady]);

  return (
    <div className="flex max-h-full min-h-full flex-col justify-between pt-20">
      <div className="min-h-full overflow-auto">
        {ready ? messageContentComponent : <Spinner />}
      </div>

      <div className="mx-auto flex w-full max-w-5xl gap-2 py-5">
        <div className="grow">
          <MessageInput />
        </div>
        <div>
          <ResetButton styleOption="iconAndText" />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { MessageInput } from '@/components/MessageInput';
import { MessageList } from '@/components/MessageList';
import WelcomeMessage from '@/components/WelcomeMessage';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import { ResetButton } from './ResetButton';

export const ChatBox = () => {
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

      <div className="w-full grid grid-cols-12 py-5 gap-2">
        <div className="col-span-2" />
        <div className="col-span-8">
          <MessageInput />
        </div>
        <div className="col-span-2 px-8">
          <ResetButton styleOption={1} />
        </div>
      </div>
    </div>
  );
};

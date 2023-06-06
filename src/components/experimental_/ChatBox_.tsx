import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ResetButton } from '@/components/ResetButton';
import WelcomeMessage from '@/components/WelcomeMessage';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import SideBar from './SideBar';
// Use experimental components
import { MessageInput } from './MessageInput_';
import { MessageList } from './MessageList_';

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
    <div className="flex h-full justify-center">
      
      <div className="flex h-full w-[100%] flex-col justify-between pt-20">
        <div className="grid h-full grid-cols-12 overflow-auto "> {/* lg:w-[75%] */}
          <div className="col-span-2" />
          <div className="col-span-8">{ready ? messageContentComponent : <Spinner />}</div>
        </div>

        <div className="p-2 grid grid-cols-12 items-center py-[24px] bg-white bg-opacity-5">
          <div className="col-span-2" />
          <div className="col-span-8">
            <MessageInput />
          </div>
          <div className="col-span-2">
            <ResetButton styleOption="iconAndText" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChatBox;

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
    <div className=" flex h-full justify-center">
      <div className="flex h-full w-full flex-col justify-between pt-20">
        {/* chat area */}
        <div className="grid h-full grid-cols-12 overflow-auto ">
          <div className="col-span-2" />
          <div className="col-span-8">{ready ? messageContentComponent : <Spinner />}</div>
        </div>
        {/* Chat inpu */}
        <div className="grid grid-cols-12 items-center bg-white bg-opacity-5 p-2 py-[24px]">
          <div className="col-span-2" />
          <div className="col-span-8">
            <MessageInput />
          </div>
          {/* <div className="col-span-2">
            <ResetButton styleOption="iconAndText" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

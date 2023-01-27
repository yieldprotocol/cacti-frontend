import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChatBox } from '@/components/ChatBox';
import { DebugButton } from '@/components/DebugButton';

export const Home = () => {
  return (
    <>
      <div className="flex h-screen flex-col bg-gray-900 px-8">
        <div className="my-4 flex justify-end gap-2">
          <DebugButton />
          <ConnectButton />
        </div>
        <div className="h-full">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Home;

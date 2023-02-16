import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChatBox } from '@/components/ChatBox';
import { DebugButton } from '@/components/DebugButton';
import { MintButton } from '@/components/MintButton';

export const Home = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <div className="fixed top-0 right-0 mr-4 mt-4 inline-flex gap-3">
          <MintButton />
          <DebugButton />
          <ConnectButton />
        </div>
        <div className="min-h-full w-full">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Home;

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChatBox } from '@/components/ChatBox';
import { DebugButton } from '@/components/DebugButton';
import { DebugMessageToggle } from '@/components/DebugMessageToggle';
import { MintButton } from '@/components/MintButton';
import { ResetButton } from '@/components/ResetButton';
import NftAttributes from '@/components/widgets/NftAttributes';

export const Home = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <div className="fixed top-0 right-0 mr-4 mt-4 inline-flex gap-3">
          <DebugMessageToggle />
          <ResetButton />
          <MintButton />
          <DebugButton />
          <ConnectButton />
        </div>
        <div className="w-full">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Home;

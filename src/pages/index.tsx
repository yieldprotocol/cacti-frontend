import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChatBox } from '@/components/ChatBox';
import { DevToolsButton } from '@/components/devTools/DevToolsButton';

export const Home = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <div className="fixed top-0 right-0 mr-4 mt-4 inline-flex gap-3">
          <ConnectButton />
          { true && <DevToolsButton /> /* TODO : add logic to show devTools: possible eg. process.env.NODE_ENV === 'development' */ } 
        </div>
        <div className="w-full">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Home;

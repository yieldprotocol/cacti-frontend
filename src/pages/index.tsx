import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BuyNFT } from '@/components/BuyNFT';
import { ChatBox } from '@/components/ChatBox';
import { DevToolsButton } from '@/components/devTools/DevToolsButton';

export const Home = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <div className="fixed top-0 right-0 mr-4 mt-4 inline-flex gap-3">
          <DevToolsButton />
          <ConnectButton />
        </div>
        <div className="w-full">
          <ChatBox />
          <BuyNFT nftAddress="0x894a19ccf5b1137507a45bb981e2c418a73651b6" tokenId="5155" />
        </div>
      </div>
    </>
  );
};

export default Home;

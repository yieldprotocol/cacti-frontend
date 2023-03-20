import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BuyNFT } from '@/components/BuyNFT';
import { ChatBox } from '@/components/ChatBox';
import { CheckNftOwner } from '@/components/CheckNftOwner';
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
          <BuyNFT nftAddress="0x1a92f7381b9f03921564a437210bb9396471050c" tokenId="4797" />
          <CheckNftOwner nftAddress="0x1a92f7381b9f03921564a437210bb9396471050c" tokenId="4797" />
        </div>
      </div>
    </>
  );
};

export default Home;

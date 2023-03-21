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
          <BuyNFT nftAddress="0x60e4d786628fea6478f785a6d7e704777c86a7c6" tokenId="20516" />
          <CheckNftOwner nftAddress="0x60e4d786628fea6478f785a6d7e704777c86a7c6" tokenId="20516" />
        </div>
      </div>
    </>
  );
};

export default Home;

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ChatBox } from '@/components/ChatBox';
import { DebugButton } from '@/components/DebugButton';
import { UniswapButton } from '@/components/UniswapButton';

export const Home = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <div className="fixed top-0 right-0 mr-4 mt-4 inline-flex gap-3">
          <UniswapButton
            tokenIn="0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
            tokenOut="0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
            amountIn="1000000000000000000"
          />
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

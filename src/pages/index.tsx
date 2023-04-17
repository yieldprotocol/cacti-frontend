import dynamic from 'next/dynamic';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const HeaderDynamic = dynamic(() => import('@/components/Header'), {
  ssr: false,
});
const ChatBoxDynamic = dynamic(() => import('@/components/ChatBox'), {
  ssr: false,
});

export const Home = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <HeaderDynamic />
        <div className="w-full">
          <ChatBoxDynamic />
        </div>
      </div>
    </>
  );
};

export default Home;

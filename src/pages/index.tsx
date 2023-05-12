import SettingsContext from '@/contexts/SettingsContext';
import dynamic from 'next/dynamic';
import { useContext } from 'react';

const HeaderDynamic = dynamic(() => import('@/components/Header'), {
  ssr: false,
});
const ChatBoxDynamic = dynamic(() => import('@/components/ChatBox'), {
  ssr: false,
});
const ChatBoxExpDynamic = dynamic(() => import('@/components/ChatBoxExp'), {
  ssr: false,
});

export const Home = () => {

  const {settings: {experimentalUi}} = useContext(SettingsContext);

  return (
    <>
      <div className="flex h-screen bg-gray-700">
        <HeaderDynamic />
        <div className="w-full">
          { !experimentalUi ? <ChatBoxDynamic /> : <ChatBoxExpDynamic /> }
        </div>
      </div>
    </>
  );
};

export default Home;

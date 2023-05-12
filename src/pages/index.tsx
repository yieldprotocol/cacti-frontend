import { useContext } from 'react';
import dynamic from 'next/dynamic';
import SettingsContext from '@/contexts/SettingsContext';

const HeaderDynamic = dynamic(() => import('@/components/Header'), {
  ssr: false,
});
const ChatBoxDynamic = dynamic(() => import('@/components/ChatBox'), {
  ssr: false,
});

/* experimental imports */
const ExperimentalChatBox = dynamic(() => import('@/components/experimental/ChatBox'), {
  ssr: false,
});

export const Home = () => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

  return (
    <>
      <div className={`flex h-screen ${experimentalUi ? 'bg-[#1C282E]' : 'bg-gray-700'}`}>
         <HeaderDynamic />
        <div className="w-full">{!experimentalUi ? <ChatBoxDynamic /> : <ExperimentalChatBox />}</div>
      </div>
    </>
  );
};

export default Home;

import { useContext } from 'react';
import dynamic from 'next/dynamic';
import SettingsContext from '@/contexts/SettingsContext';
import Sidebar from '@/components/SideBar';

const HeaderDynamic = dynamic(() => import('@/components/Header'), {
  ssr: false,
});
const ChatBoxDynamic = dynamic(() => import('@/components/ChatBox'), {
  ssr: false,
});

/* experimental imports */
const ExperimentalChatBox = dynamic(() => import('@/components/experimental_/ChatBox_'), {
  ssr: false,
});
const SideBarDynamic = dynamic(() => import('@/components/SideBar'), {
  ssr: false,
});

export const Home = () => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

  return (
    <>
      <div className={`flex h-screen ${experimentalUi ? 'bg-[#031016]' : 'bg-gray-700'}`}>
        <HeaderDynamic />
        <SideBarDynamic />
        <div className="w-full">
          {!experimentalUi ? <ChatBoxDynamic /> : <ExperimentalChatBox />}
        </div>
      </div>
    </>
  );
};

export default Home;

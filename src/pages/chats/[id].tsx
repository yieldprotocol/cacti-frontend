import { useContext } from 'react';
import dynamic from 'next/dynamic';
import SettingsContext from '@/contexts/SettingsContext';

const ChatBoxDynamic = dynamic(() => import('@/components/ChatBox'), {
  ssr: false,
});

/* experimental imports */
const ExperimentalChatBox = dynamic(() => import('@/components/experimental_/ChatBox_'), {
  ssr: false,
});

export const Home = () => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

  return <>{experimentalUi ? <ExperimentalChatBox /> : <ChatBoxDynamic />}</>;
};

export default Home;

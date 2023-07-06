import dynamic from 'next/dynamic';

const ChatBoxDynamic = dynamic(() => import('@/components/experimental_/ChatBox_'), {
  ssr: false,
});

export const Home = () => <ChatBoxDynamic />;

export default Home;

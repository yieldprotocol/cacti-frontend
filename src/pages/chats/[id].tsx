import dynamic from 'next/dynamic';

const ChatBoxDynamic = dynamic(() => import('@/components/experimental_/ChatBox_'), {
  ssr: false,
});

export const Chat = () => <ChatBoxDynamic />;

export default Chat;

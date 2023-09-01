import dynamic from 'next/dynamic';

const ChatBoxDynamic = dynamic(() => import('@/components/current/ChatBox'), {
  ssr: false,
});

export const Chat = () => <ChatBoxDynamic />;

export default Chat;

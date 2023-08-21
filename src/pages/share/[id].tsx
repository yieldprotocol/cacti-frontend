import dynamic from 'next/dynamic';

const ShareBoxDynamic = dynamic(() => import('@/components/current/ShareBox'), {
  ssr: false,
});

export const Chat = () => <ShareBoxDynamic />;

export default Chat;

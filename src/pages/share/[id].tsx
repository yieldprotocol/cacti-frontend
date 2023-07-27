import dynamic from 'next/dynamic';

const ShareBoxDynamic = dynamic(() => import('@/components/experimental_/ShareBox'), {
  ssr: false,
});

export const Chat = () => <ShareBoxDynamic />;

export default Chat;

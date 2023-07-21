import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicChatHeader = dynamic(() => import('@/components/experimental_/ChatHeader'), {
  ssr: false,
});

const Header = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div className="h-full w-full">{id ? <DynamicChatHeader /> : null}</div>;
};

export default Header;

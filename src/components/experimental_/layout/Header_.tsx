import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicChatHeader = dynamic(() => import('@/components/experimental_/ChatHeader'), {
  ssr: false,
});

const Header = () => {
  const router = useRouter();
  const { id } = router.query;

  return id ? <DynamicChatHeader /> : null;
};

export default Header;

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicChatHeader = dynamic(() => import('@/components/experimental_/ChatHeader'), {
  ssr: false,
});

const Header = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="mt-4 flex h-full w-full items-center justify-between gap-2 lg:pl-[15rem] ">
      <div className="0 space-y-2 py-2">{id ? <DynamicChatHeader /> : null}</div>
    </div>
  );
};

export default Header;

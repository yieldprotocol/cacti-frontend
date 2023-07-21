import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const DynamicChatHeader = dynamic(() => import('@/components/experimental_/ChatHeader'), {
  ssr: false,
});

const Header = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="flex h-full w-full items-center justify-between gap-2 lg:pl-[15rem] ">
      {id ? <DynamicChatHeader /> : null}
    </div>
  );
};

export default Header;

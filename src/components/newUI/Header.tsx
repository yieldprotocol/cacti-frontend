import { useRouter } from 'next/router';
import { EllipsisVerticalIcon, PencilIcon, ShareIcon } from '@heroicons/react/20/solid';
import { CustomConnectButton } from './CustomConnectButton';

const PrimaryActions = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4">
        <PencilIcon />
      </div>
      <div className="h-4 w-4">
        <ShareIcon />
      </div>
    </div>
  );
};

const SecondaryActions = () => {
  return (
    <div className="h-4 w-4">
      <EllipsisVerticalIcon />
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const { s: threadId } = router.query;

  return (
    <div className="flex h-full w-full items-center justify-between gap-2 lg:pl-[15rem]">
      <div className="space-y-2 text-white/70">
        {threadId ? (
          <>
            <div className="flex items-center gap-2">
              {threadId}
              <PrimaryActions />
              <SecondaryActions />
            </div>
            <div className="text-xs text-white/30"> Last edit: yesterday </div>
          </>
        ) : null}
      </div>
      <div className="">
        <CustomConnectButton />
      </div>
    </div>
  );
};

export default Header;

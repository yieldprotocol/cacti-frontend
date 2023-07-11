import { useRouter } from 'next/router';
import {
  EllipsisVerticalIcon,
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  ShareIcon,
} from '@heroicons/react/20/solid';
import { useMutationUpdateShareSettings } from '@/api/mutations';
import { useQueryShareSettings } from '@/api/queries';
import { CustomConnectButton } from './CustomConnectButton';

// const ShareButton = () => {
//   return (
//     <div
//       className=" w-full cursor-pointer select-none rounded-[8px] bg-teal-900 p-[8px] text-center text-white transition ease-in-out active:bg-transparent"
//       onClick={() => console.log('share')}
//     >
//       <div className="text-xs text-white/70 ">Share</div>
//     </div>
//   );
// };

const PrimaryActions = ({ sessionId }: { sessionId: string }) => {
  const { isSuccess, settings } = useQueryShareSettings(sessionId);
  const mutation = useMutationUpdateShareSettings(sessionId);
  const toggleVisibility = () => {
    const targetVisibility = settings?.visibility == 'public' ? 'private' : 'public';
    mutation.mutate({ metadata: { visibility: targetVisibility } });
  };
  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4">
        <PencilIcon />
      </div>
      <div className="h-4 w-4">
        <ShareIcon />
      </div>
      {isSuccess && (
        <button className="h-4 w-4" onClick={toggleVisibility}>
          {settings?.visibility == 'public' ? <EyeIcon /> : <EyeSlashIcon />}
        </button>
      )}
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

  const sessionId = typeof threadId === 'string' ? threadId : threadId?.[0];

  return (
    <div className="flex h-full w-full items-center justify-between gap-2 lg:pl-[15rem]">
      <div className="space-y-2 text-white/70">
        {sessionId ? (
          <>
            <div className="flex items-center gap-2">
              {sessionId}
              <PrimaryActions sessionId={sessionId} />
              <SecondaryActions />
            </div>
            <div className="text-xs text-white/30"> Last edit: yesterday </div>
          </>
        ) : null}
      </div>
      <div className="">
        <CustomConnectButton />
        {/* <SettingsDropdown /> */}
      </div>
    </div>
  );
};

export default Header;

import { useRouter } from 'next/router';
import { EllipsisVerticalIcon, PencilIcon, ShareIcon } from '@heroicons/react/20/solid';
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
    <div
      className={`fixed right-0 inline-flex w-full items-center  ${
        threadId ? 'bg-white bg-opacity-5 p-2' : ''
      } `}
    >
      <div className={`mb-4 ml-[250px] flex justify-between px-4 py-2 text-white/70 `}>
        {threadId ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {threadId}
              <PrimaryActions />
              <SecondaryActions />
            </div>
            <div className="text-xs text-white/30"> Last edit: yesterday </div>
          </div>
        ) : null}

        <div className="fixed right-0 top-0 z-10 mr-4 mt-4 inline-flex gap-3">
          <CustomConnectButton />
          {/* <SettingsDropdown /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;

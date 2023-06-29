import { ReactNode } from 'react';
import {
  EllipsisVerticalIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const ShareButton = () => {
  return (
    <div
      className=" w-full cursor-pointer select-none rounded-[8px] bg-teal-900 p-[8px] text-center text-white transition ease-in-out active:bg-transparent"
      onClick={() => console.log('share')}
    >
      <div className="text-xs text-white/70 ">Share</div>
    </div>
  );
};

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

export const ChatHeader = ({ threadId }: { threadId: String | String[] }) => {
  return (
    <div className="w-full items-center bg-white bg-opacity-5 p-2 ">
      <div className={`mb-4 flex justify-between px-4 py-2 text-white/70 `}>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            {threadId}
            <PrimaryActions />
            <SecondaryActions />
            {/* <div className='w-4 h-4'> <PencilIcon/> </div> */}
          </div>
          <div className="text-xs text-white/30"> Last edit: yesterday </div>
        </div>

        <div className={`flex flex-row items-center  gap-2`}>
          <div>
            <ShareButton />
          </div>
          <div className="h-4 w-4">
            <TrashIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

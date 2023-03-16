import { useState } from 'react';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { DevToolsModal } from './DevToolsModal';

export const DevToolsButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="align-center text-md flex rounded-xl bg-black px-6 py-2.5 font-bold leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-lg focus:shadow-lg active:shadow-lg"
      >
        DevTools <ArrowTopRightOnSquareIcon className="ml-1 h-5 w-5" />
      </button>
      <DevToolsModal openState={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

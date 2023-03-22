import { useState } from 'react';
import { DevToolsModal } from './DevToolsModal';

export const DevToolsButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button onClick={() => setOpenModal(true)} className="text-white">
        Developer Tools
      </button>
      <DevToolsModal openState={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

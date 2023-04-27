import { Fragment, useContext, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Menu, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { Cog8ToothIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { DevToolsModal } from '@/components/devTools/DevToolsModal';
import SettingsContext from '@/contexts/SettingsContext';

const SettingsDropdown = () => {
  const {
    settings: { isForkedEnv },
  } = useContext(SettingsContext);

  const [openModal, setOpenModal] = useState(false);
  /* shortcut open/close dev modal */
  useHotkeys('alt+d', () => setOpenModal(!openModal));

  return (
    <Menu as="div" className="relative">
      <div className="relative">
        {isForkedEnv && (
          <ExclamationCircleIcon className="absolute top-0 right-0 h-4 w-4 text-green-500" />
        )}
        <Menu.Button className="h-full w-full rounded-md p-2 align-middle hover:bg-gray-800">
          <Cog8ToothIcon className="h-6 w-6 text-white hover:text-gray-200" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-50"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-50"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-gray-800 p-2 shadow-md focus:outline-none">
          <Menu.Item>
            <button
              className="text-md flex w-full items-center gap-2 rounded-md p-2 px-2 py-2 text-white hover:bg-gray-700"
              onClick={() => setOpenModal(true)}
            >
              <WrenchIcon className="h-5 w-5 text-white" />
              <div>Dev Tools </div>
              <div className="align-middle font-mono text-[0.5em] text-slate-500"> ( alt-d )</div>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
      <DevToolsModal openState={openModal} handleClose={() => setOpenModal(false)} />
    </Menu>
  );
};

export default SettingsDropdown;

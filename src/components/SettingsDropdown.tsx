import { Fragment, useContext, useState } from 'react';
import { Menu, Switch, Transition } from '@headlessui/react';
import { SignalIcon } from '@heroicons/react/20/solid';
import { Cog8ToothIcon, WrenchIcon } from '@heroicons/react/24/outline';
import { DevToolsModal } from '@/components/devTools/DevToolsModal';
import SettingsContext, { Setting } from '@/contexts/SettingsContext';
import useForkTools from '@/hooks/useForkTools';

const SettingsDropdown = () => {
  const {
    settings: { isForkedEnv },
    changeSetting,
  } = useContext(SettingsContext);

  const [openModal, setOpenModal] = useState(false);

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="h-full w-full rounded-md p-2 align-middle hover:bg-gray-800">
        <Cog8ToothIcon className="h-6 w-6 text-white hover:text-gray-200" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-4 w-56 origin-top-right rounded-md bg-gray-800 p-2 shadow-md focus:outline-none">
          <Menu.Item>
            <button
              className="text-md flex w-full items-center gap-2 rounded-md p-2 text-white hover:bg-gray-700"
              onClick={() => changeSetting(Setting.FORKED_ENV, !isForkedEnv)}
            >
              <SignalIcon className="ml-1 h-5 w-5 text-white" />
              <div className="flex w-full justify-between">
                <div>Use Fork</div>
                <Switch
                  checked={isForkedEnv}
                  onChange={() => changeSetting(Setting.FORKED_ENV, !isForkedEnv)}
                  className={`${
                    isForkedEnv ? 'bg-green-600' : 'bg-gray-600'
                  } relative inline-flex h-6 w-11 items-center rounded-full`}
                >
                  <span
                    className={`${
                      isForkedEnv ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                  />
                </Switch>
              </div>
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="text-md flex w-full items-center gap-2 rounded-md p-2 px-2 py-2 text-white hover:bg-gray-700"
              onClick={() => setOpenModal(true)}
            >
              <WrenchIcon className="ml-1 h-5 w-5 text-white" />
              <div>Developer Tools</div>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
      <DevToolsModal openState={openModal} handleClose={() => setOpenModal(false)} />
    </Menu>
  );
};

export default SettingsDropdown;

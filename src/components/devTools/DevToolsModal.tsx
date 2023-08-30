import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { DebugPanel } from '@/components/devTools/DebugPanel';
import { ResetButton } from './ResetButton';
import { ChangeForkId } from './ChangeForkId';
import { CurrentForkInfo } from './CurrentForkInfo';
import { DebugMessageToggle } from './DebugMessageToggle';
import { ExperimentalUiToggle } from './ExperimentalUiToggle';
import ForkButton from './ForkButton';
import { MintButton } from './MintButton';
import { SessionInfo } from './SessionInfo';

interface Props {
  openState: boolean;
  handleClose: () => void;
}

export const DevToolsModal = ({ openState, handleClose }: Props) => {
  return (
    <Transition.Root show={openState} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-500 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6 md:max-w-[75%] lg:max-w-[75%]">
                <div className="space-y-4 p-4">
                  <div className="flex justify-between">
                    <Dialog.Title as="h2" className="text-lg font-bold leading-6 text-gray-200">
                      Development Toolbox
                    </Dialog.Title>
                    <div className="absolute right-0 top-0 pr-4 pt-4">
                      <button
                        type="button"
                        className="rounded-md text-gray-200 hover:text-gray-400 focus:outline-none"
                        onClick={handleClose}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 space-x-4">
                    <div className="col-span-1 rounded-lg bg-gray-300 text-center">
                      <div className="pt-4 text-lg font-medium leading-6 text-gray-900">
                        Actions and Setttings
                        <p className="m-2 text-xs">A collection of useful development tools</p>
                      </div>
                      <hr />

                      <div className="mt-8 flex px-4 text-left text-sm font-bold leading-6 text-gray-900">
                        General
                      </div>

                      <div className="mt-4 space-y-8 p-4">
                        <SessionInfo />
                      </div>

                      <div className="mt-4 space-y-8 p-4">
                        <DebugMessageToggle />
                        <ExperimentalUiToggle />
                        <ResetButton />
                      </div>

                      <div className="mt-8 flex px-4 text-left text-sm font-bold leading-6 text-gray-900">
                        Forked Environment
                      </div>

                      <div className="space-y-4 p-4 ">
                        <ForkButton />
                        <CurrentForkInfo />
                        <MintButton />
                        {/* <ChangeForkId /> */}
                      </div>
                    </div>

                    <div className="col-span-2 rounded-lg bg-gray-300 text-center ">
                      <div className="pt-4 text-lg font-medium leading-6 text-gray-900">
                        Debug Mode
                        <p className="m-2 text-xs">
                          In debug mode, you can spoof messages from the bot.
                        </p>
                      </div>
                      <hr />
                      <div>
                        <DebugPanel handleClose={handleClose} />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

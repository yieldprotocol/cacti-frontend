import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { DebugPanel } from '@/components/devTools/DebugPanel';
import { ResetButton } from '../ResetButton';
import { DebugMessageToggle } from './DebugMessageToggle';
import { MintButton } from './MintButton';

interface Props {
  openState: boolean;
  handleClose: () => void;
}

export const DevToolsModal = ({ openState, handleClose }: Props) => {
  return (
    <Transition.Root show={openState} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-500 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6 md:max-w-[75%] lg:max-w-[75%]">
                <div className="space-y-4 p-4">
                  <div className="flex justify-between">
                    <Dialog.Title as="h2" className="text-lg font-bold leading-6 text-white">
                      Development Toolbox
                    </Dialog.Title>
                    <div className="absolute top-0 right-0 pt-4 pr-4">
                      <button
                        type="button"
                        className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleClose}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 space-x-4">
                    <div className="col-span-1 rounded-lg bg-white text-center ">
                      <div className="pt-4 text-lg font-medium leading-6 text-gray-900">
                        Actions and Setttings
                        <p className="m-2 text-xs">A collection of useful development tools</p>
                      </div>
                      <hr />
                      <div className="mt-4 space-y-8 p-4">
                        <DebugMessageToggle />

                        <MintButton />

                        <ResetButton />
                      </div>
                    </div>

                    <div className="col-span-2 rounded-lg bg-white text-center ">
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
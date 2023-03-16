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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-500 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-6 md:max-w-[75%] lg:max-w-[75%]">
                <div className="p-4 space-y-4">
                  <div className="flex justify-between">
                    <div className="text-lg font-bold leading-6 text-gray-900">
                      Development Toolbox
                    </div>
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


                  <div className="grid grid-cols-3 space-x-4" >

                    <div className= "bg-white rounded-lg p-4 space-y-4 col-span-1">
                      <div className="flex justify-between ">
                        Toggle debugging messages
                        <DebugMessageToggle />
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        Mint 10 ETH to connected wallet
                        <MintButton />
                      </div>
                      <hr />
                      <div className="flex justify-between">
                        Reset chat
                        <ResetButton />
                      </div>
                    </div>

                    <div className="text-center bg-white rounded-lg col-span-2 ">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                        Debug Mode
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="m-4">In debug mode, you can spoof messages from the bot.</p>
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

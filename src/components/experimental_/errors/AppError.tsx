import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, ReactNode, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';



const buttonStyle =
'w-full cursor-pointer select-none rounded-lg bg-green-primary hover:bg-green-primary/80 p-[8px] text-center text-white transition ease-in-out ';

const AppErrorBoundary = ({ children }: { children: ReactNode }) => {

    const router = useRouter();
    const handleReload = () => {
        router.push("/").then(()=>router.reload());       
    };
    
    return (
      <ErrorBoundary
        FallbackComponent={() => {
          return ( <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handleReload}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
              </Transition.Child>
    
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title as="h2" className="text-lg font-bold leading-6 text-gray-900">
                        Application Error
                      </Dialog.Title>
    
                      <div className="mt-2 space-y-4 py-4 ">
                        <p className="text-sm text-gray-500">
                          Something went wrong. Please reload and try again.
                        </p>

                        <button
                      type="button"
                      className={buttonStyle}
                      onClick={() => handleReload()}
                      
                    >
                      <div className="flex items-center justify-center gap-2 ">
                        <div className="text-sm">
                          Reload the Application
                        </div>
                      </div>
                    </button>

                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>);
        }}
      >
        {children}
      </ErrorBoundary>
    );
  };

export default AppErrorBoundary;
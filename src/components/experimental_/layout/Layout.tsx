import { Fragment, ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ChatHeader from '../ChatHeader';
import Sidebar from './SideBar';

const SidebarContainer = ({
  isOpen,
  setIsOpen: setOpen,
  children,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/10 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-white/20 bg-black px-6 pb-2">
                  {/* <Logo /> */}
                  <nav className="flex flex-1 flex-col">{children}</nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* ---------------------------------------Static sidebar for desktop */}
      <div className="hidden border-r-[1px] border-white/20 bg-[#031016] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-60 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto  px-2 pt-6">
          {/* <Logo /> */}
          <nav className="flex flex-1 flex-col">{children}</nav>
        </div>
      </div>
    </div>
  );
};
const Header = ({
  setIsOpen,
  children,
}: {
  children: React.ReactNode;
  setIsOpen: (open: boolean) => void;
}) => (
  <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 bg-[#031016] px-2 shadow sm:gap-x-6 sm:px-6 lg:px-8">
    <button
      type="button"
      className="-m-2.5 p-2.5 text-white/50 lg:hidden"
      onClick={() => setIsOpen(true)}
    >
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
    <div className="w-full">{children}</div>
  </div>
);

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="relative min-h-screen bg-[#031016]">
      <SidebarContainer isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
        <Sidebar />
      </SidebarContainer>
      <main className="flex flex-col">
        <Header setIsOpen={setSidebarOpen}>
          <ChatHeader />
        </Header>
        <div className={`${sidebarOpen ? 'lg:pl-60' : ''} grow lg:pl-60`}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

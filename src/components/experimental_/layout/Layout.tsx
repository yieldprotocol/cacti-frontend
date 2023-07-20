import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Header from './Header_';
import Sidebar from './sidebar';
import SidebarContainer from './sidebar/SidebarContainer';

const HeaderContainer = ({
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
      <Sidebar />
      <main className="flex flex-col">
        <HeaderContainer setIsOpen={setSidebarOpen}>
          <Header />
        </HeaderContainer>
        <div className={`${sidebarOpen ? 'lg:pl-60' : ''} grow lg:pl-60`}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Header from './Header_';

const DynamicSidebar = dynamic(() => import('@/components/experimental_/layout/sidebar'), {
  ssr: false,
});

const HeaderContainer = ({
  isOpen,
  setIsOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: (open: boolean) => void;
}) => (
  <div className="sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 bg-[#031016] px-4 shadow sm:gap-x-6 sm:px-6 lg:px-8">
    <button type="button" className="text-white/50 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
      <span className="sr-only">Open sidebar</span>
      <Bars3Icon className="h-8 w-8" aria-hidden="true" />
    </button>
    <div className="w-full">{children}</div>
  </div>
);

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-[#031016]">
      <DynamicSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <main className="w-full">
        <div className="flex flex-col">
          <HeaderContainer setIsOpen={setSidebarOpen} isOpen={sidebarOpen}>
            <Header />
          </HeaderContainer>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;

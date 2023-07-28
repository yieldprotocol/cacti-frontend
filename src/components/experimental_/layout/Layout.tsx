import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Bars3Icon } from '@heroicons/react/24/outline';
import CustomConnectButton from '../CustomConnectButton';
import Header from './Header_';

const DynamicSidebar = dynamic(() => import('@/components/experimental_/layout/sidebar/index'), {
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
}) => {
  const { pathname } = useRouter();
  return (
    <div
      className={`sticky top-0 z-40 flex items-center gap-x-4 ${
        pathname !== '/' ? 'bg-gray-secondary' : ''
      } text-white/70 sm:gap-x-6 sm:p-6`}
    >
      <button type="button" className="text-white/50 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-8 w-8" aria-hidden="true" />
      </button>

      <div className="h-full w-full">{children}</div>
      <div className="hidden min-w-[200px] md:block ">
        <CustomConnectButton />
      </div>
    </div>
  );
};

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-primary">
      <div className="flex h-full w-full overflow-hidden">
        <div className="flex h-full w-full">
          <DynamicSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <main className="flex h-full w-full flex-col">
            <HeaderContainer setIsOpen={setSidebarOpen} isOpen={sidebarOpen}>
              <Header />
            </HeaderContainer>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

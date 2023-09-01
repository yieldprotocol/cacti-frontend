import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicSidebar = dynamic(() => import('@/components/current/layout/sidebar/index'), {
  ssr: false,
});

const DynamicHeader = dynamic(() => import('@/components/current/layout/header/index'), {
  ssr: false,
});

const Layout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-primary">
      <div className="flex h-full w-full overflow-hidden">
        <div className="flex h-full w-full">
          <DynamicSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
          <main className="flex h-full w-full flex-col">
            <DynamicHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

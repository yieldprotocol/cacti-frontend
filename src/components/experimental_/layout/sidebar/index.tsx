import { useState } from 'react';
import dynamic from 'next/dynamic';
import SidebarContainer from './SidebarContainer';

const SidebarInnerDynamic = dynamic(
  () => import('@/components/experimental_/layout/sidebar/SideBar'),
  {
    ssr: false,
  }
);

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <SidebarContainer isOpen={sidebarOpen} setIsOpen={setSidebarOpen}>
      <SidebarInnerDynamic />
    </SidebarContainer>
  );
};

export default Sidebar;

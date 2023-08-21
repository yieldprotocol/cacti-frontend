import dynamic from 'next/dynamic';
import SidebarContainer from './SidebarContainer';

const SidebarInnerDynamic = dynamic(
  () => import('@/components/current/layout/sidebar/SideBar'),
  {
    ssr: false,
  }
);

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  return (
    <SidebarContainer isOpen={isOpen} setIsOpen={setIsOpen}>
      <SidebarInnerDynamic isOpen={isOpen} setIsOpen={setIsOpen} />
    </SidebarContainer>
  );
};

export default Sidebar;

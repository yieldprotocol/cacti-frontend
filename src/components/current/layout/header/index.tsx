import HeaderContainer from './HeaderContainer';
import HeaderInner from './Header_';

const Header = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}) => (
  <HeaderContainer setIsOpen={setSidebarOpen} isOpen={sidebarOpen}>
    <HeaderInner />
  </HeaderContainer>
);

export default Header;

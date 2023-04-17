import { ConnectButton } from '@rainbow-me/rainbowkit';
import SettingsDropdown from '@/components/SettingsDropdown';

const Header = () => {
  return (
    <div className="fixed right-0 top-0 mr-4 mt-4 inline-flex gap-3">
      <ConnectButton />
      <SettingsDropdown />
    </div>
  );
};

export default Header;

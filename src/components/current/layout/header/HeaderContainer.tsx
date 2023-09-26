import { useRouter } from 'next/router';
import { Bars3Icon } from '@heroicons/react/24/outline';
import CustomConnectButton from '../../CustomConnectButton';

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
      className={`sticky top-0 z-40 flex gap-x-4 p-4 pt-6 text-white/70 sm:gap-x-6 ${
        pathname !== '/' ? 'bg-gray-secondary' : ''
      }`}
    >
      <button type="button" className="text-white/50 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-8 w-8" aria-hidden="true" />
      </button>

      <div className="h-full w-full ">{children}</div>
      <div className="hidden min-w-[200px] md:block">
        <CustomConnectButton />
      </div>
    </div>
  );
};

export default HeaderContainer;

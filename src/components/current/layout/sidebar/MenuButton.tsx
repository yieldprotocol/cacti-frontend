import { QueueListIcon } from '@heroicons/react/24/outline';

const MenuButton = ({ action }: { action: () => void }) => {
  return (
    <div className="absolute left-4 top-4 p-2">
      <div
        className="
      flex
      cursor-pointer 
      select-none 
      justify-center 
      rounded-[8px] p-2
       text-xs 
       text-white/70
       hover:bg-white
       hover:bg-opacity-20"
        onClick={action}
      >
        <div className="h-4 w-4">
          <QueueListIcon />
        </div>
      </div>
    </div>
  );
};

export default MenuButton;

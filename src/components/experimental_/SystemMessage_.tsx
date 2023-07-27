import { CommandLineIcon } from '@heroicons/react/24/outline';

export const SystemMessage = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-row items-center gap-4 pb-3 font-mono text-xs text-white text-opacity-70">
      <div className="w-min-[16px] w-[16px]">
        <CommandLineIcon />
      </div>
      <div className="w-[90%] flex-shrink">{message}</div>
    </div>
  );
};

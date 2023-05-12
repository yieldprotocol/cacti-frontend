import { CommandLineIcon } from "@heroicons/react/24/outline";

export const SystemMessage = ({ message }: { message: string }) => {
  return (
  <div className="flex flex-row gap-4 text-white text-opacity-70 font-mono text-xs items-center">
    <div className="w-[16px] w-min-[16px]">< CommandLineIcon /></div>
    <div className="flex-shrink w-[90%]"> {message} </div>
  </div>);
};

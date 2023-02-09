import { XCircleIcon } from '@heroicons/react/24/outline';

export const WidgetError = ({ children }) => {
  return (
    <div className="m-2 flex items-center bg-red-800 p-2 text-sm">
      <div className="pr-1">
        <XCircleIcon className="h-6 h-6 text-white" />
      </div>
      <div>{children}</div>
    </div>
  );
};

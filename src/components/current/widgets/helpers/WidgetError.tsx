import { ReactNode } from 'react';
import { XCircleIcon } from '@heroicons/react/20/solid';

export const WidgetError = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-h-48 overflow-y-auto rounded-md p-4">
      <div className="flex">
        <div className="">
          <XCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="break-all font-medium text-white/70">Error: {children}</h3>
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="list-disc space-y-1 pl-5"></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

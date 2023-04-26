import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useChatContext } from '@/contexts/ChatContext';
import { BugAntIcon } from '@heroicons/react/24/outline';

export const DebugMessageToggle = () => {
  const { showDebugMessages, setShowDebugMessages } = useChatContext();

  return (
    <button
    className="text-md flex w-full items-center gap-2 rounded-xl p-2 hover:bg-slate-600"
    onClick={() => setShowDebugMessages(!showDebugMessages)}
  >
    <BugAntIcon className="ml-1 h-5 w-5" />
    <div className="flex w-full items-center justify-between hover:text-white">
      <div className="text-xs" >Enable debug logs </div>
      <Switch
        checked={showDebugMessages}
        onChange={setShowDebugMessages}
        className={`${
          showDebugMessages ? 'bg-gray-600' : 'bg-gray-400'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            showDebugMessages ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
    </div>
  </button>

  );
};

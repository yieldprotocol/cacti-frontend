import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { useChatContext } from '@/contexts/ChatContext';

export const DebugMessageToggle = () => {
  const { debugMessages, updateDebugMessages } = useChatContext();

  return (
    <div className="flex gap-2 self-center">
      <Switch
        checked={debugMessages}
        onChange={updateDebugMessages}
        className={`${
          debugMessages ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 items-center rounded-full`}
      >
        <span
          className={`${
            debugMessages ? 'translate-x-6' : 'translate-x-1'
          } inline-block h-4 w-4 transform rounded-full bg-white transition`}
        />
      </Switch>
      <span className="text-white">Enable debug logs</span>
    </div>
  );
};

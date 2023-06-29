import { useContext, useState } from 'react';
import { Switch } from '@headlessui/react';
import { BeakerIcon } from '@heroicons/react/24/outline';
import SettingsContext, { Setting } from '@/contexts/SettingsContext';

export const ExperimentalUiToggle = () => {
  const {
    settings: { experimentalUi },
    changeSetting,
  } = useContext(SettingsContext);

  const toggleUI = () => {
    changeSetting(Setting.EXPERIMENTAL_UI, !experimentalUi);
  };

  return (
    <button
      className="text-md flex w-full items-center gap-2 rounded-xl p-2 hover:bg-slate-600"
      onClick={toggleUI}
    >
      <BeakerIcon className="ml-1 h-5 w-5" />
      <div className="flex w-full items-center justify-between hover:text-white">
        <div className="text-xs">Enable Experimental UI </div>
        <Switch
          checked={experimentalUi}
          onChange={toggleUI}
          className={`${
            experimentalUi ? 'bg-gray-600' : 'bg-gray-400'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              experimentalUi ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </button>
  );
};

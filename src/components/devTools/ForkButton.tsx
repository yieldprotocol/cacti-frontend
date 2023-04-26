import { Switch } from '@headlessui/react';
import { SignalIcon } from '@heroicons/react/20/solid';
import SettingsContext, { Setting } from '@/contexts/SettingsContext';
import { useContext } from 'react';

const ForkButton = () => {

  const {settings , changeSetting} = useContext(SettingsContext);
  const { isForkedEnv } = settings;

  const setIsFork = (val: boolean) => {
    changeSetting( Setting.FORKED_ENV , val);
  }

  return (
    <button
      className="text-md flex w-full items-center gap-2 rounded-xl p-2 hover:bg-slate-600"
      onClick={() => setIsFork(!isForkedEnv)}
    >
      <SignalIcon className="ml-1 h-5 w-5" />
      <div className="flex w-full items-center justify-between hover:text-white">
        <div>Use Fork </div>
        <div className="align-middle font-mono text-xs text-slate-500"> ( alt-f )</div>

        <Switch
          checked={isForkedEnv}
          onChange={setIsFork}
          className={`${
            isForkedEnv ? 'bg-green-600' : 'bg-gray-600'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              isForkedEnv ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </button>
  );
};

export default ForkButton;

import SettingsContext from '@/contexts/SettingsContext';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { useContext } from 'react';

const ForkStatus = () => {
  const { settings } = useContext(SettingsContext);
  const { isForkedEnv } = settings;

  return (
    <>
      {isForkedEnv ? (
        <div>
          <div className={`flex flex-col justify-between text-xs text-orange-500`}>
            <div />
            <div className="flex gap-2 items-center">
              <span className='w-3 h-3' > <ExclamationTriangleIcon />  </span>
              <span>Test Environemnt</span>
            </div>
          </div>
        </div>
      ) : null}
    </>


  );
};


export default ForkStatus;

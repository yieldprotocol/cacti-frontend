import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

export const ResetButton = (props:any) => {
  const reset = () => {
    const q = window.location.search;
    const params = new URLSearchParams(q);
    params.delete('s');
    const paramString = params.toString();
    window.location.assign(paramString ? `/?${paramString}` : '/');
  };

  const buttonStyles = [];
  buttonStyles[0] = <Button onClick={reset}>Reset</Button>;
  buttonStyles[1] = (
    <div className="text-xs text-gray-500 hover:text-white px-8">
      <button onClick={reset} className="" >
          <div className="w-[1.5em]"> <ArrowPathIcon /> </div>
          <div>Reset All</div>
      </button>
    </div>
  );

  return buttonStyles[props.styleOption || 0];
};

import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

type ResetButtonProps = {
  styleOption?: number;
}

export const ResetButton = (props: ResetButtonProps) => {
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
    <button className="text-xs text-gray-500 hover:text-white" onClick={reset}>
      <div className="p-1">
        <ArrowPathIcon />
      </div>
      <div className="-m-1">Reset </div>
    </button>
  );

  return buttonStyles[props.styleOption || 0];
};

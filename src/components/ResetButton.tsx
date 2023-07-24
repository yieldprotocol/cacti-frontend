import { useRouter } from 'next/router';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from './Button';

type ResetButtonProps = {
  styleOption?: 'button' | 'iconAndText';
};

type ButtonStyles = {
  button: JSX.Element;
  iconAndText: JSX.Element;
};

export const ResetButton = (props: ResetButtonProps) => {
  const router = useRouter();
  const reset = () => router.push('/');

  const buttonStyles: ButtonStyles = {
    button: <Button onClick={reset}>Reset</Button>,
    iconAndText: (
      <button className="text-xs text-gray-500 hover:text-white" onClick={reset}>
        <div className="p-1">
          <ArrowPathIcon />
        </div>
        <div className="-m-1">Reset</div>
      </button>
    ),
  };

  return buttonStyles[props.styleOption || 'button'];
};

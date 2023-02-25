import { Button } from './Button';

export const ResetButton = () => {
  const reset = () => {
    window.location.assign('/');
  };
  return <Button onClick={reset}>Reset</Button>;
};

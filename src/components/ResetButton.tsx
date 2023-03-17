import { Button } from './Button';

export const ResetButton = () => {
  const reset = () => {
    const q = window.location.search;
    const params = new URLSearchParams(q);
    params.delete('s');
    const paramString = params.toString();
    window.location.assign(paramString ? `/?${paramString}` : '/');
  };
  return <Button onClick={reset} className="disabled:bg-gray-400 flex w-full">Reset</Button>;
};

import { ReactNode } from 'react';

const InputWrap = ({
  className_,
  children,
  submitFunction,
}: {
  children: ReactNode;
  className_?: string;
  submitFunction?: () => void;
}) => {
  return (
    <div className={`mx-auto w-full rounded-lg bg-black/30 ${className_ ?? ''} `}>
      <div className="flex items-center rounded-lg border border-gray-300/10 p-2 duration-200 focus-within:border-teal-100/30 gap-1 lg:gap-3">
        {children}
        {!!submitFunction ? (
          <div className="flex gap-2">
              <div
                className="rounded-md bg-gray-500/25 p-2 text-xs uppercase text-gray-100 hover:text-white "
                onClick={submitFunction}
              >
                enter
              </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default InputWrap;

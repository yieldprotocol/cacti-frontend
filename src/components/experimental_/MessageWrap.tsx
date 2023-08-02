import { ReactNode } from 'react';

export const MessageWrap = ({
  avatar,
  className_,
  children,
}: {
  avatar: ReactNode;
  children: ReactNode;
  className_?: string;
}) => {
  return (
    <div className={`grid-gap-2 grid grid-cols-12 ${className_}`}>
      <div className="col-span-2 py-4">
        <div className="float-right">{avatar}</div>
      </div>
      <div className="col-span-8 flex items-center px-4 text-white/70 focus:outline-none">
        {children}  
      </div>
    </div>
  );
};

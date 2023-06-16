import React from 'react';

const Grid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
  return (
    <ul
      role="list"
      className={`${className} grid w-[100%] grid-cols-3 flex-wrap gap-x-6 gap-y-1 after:flex-auto xl:grid-cols-4`}
    >
      {children}
    </ul>
  );
};

export default Grid;

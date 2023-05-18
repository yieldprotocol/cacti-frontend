/**
 * Block Element for displaying a block of cacti Responses
 * NOTE: not used
 */
export const ResponseBlock = (props: any) => <div>{[...props.children]}</div>;

/**
 * Simple Row Element for displaying a single line of responses
 */
export const ResponseRow = (props: any) => (
  <div className="flex items-center gap-2">{[...props.children]}</div>
);

export const ResponseWrap = (props: any) => (
  <div
    className={`
    flex-grow 
    rounded-[8px]
    border-[1px] border-white border-opacity-10 px-[24px]
    py-[16px] text-sm
    text-white text-opacity-50 hover:border-opacity-30
  `}
  >
    {props.children}
  </div>
);

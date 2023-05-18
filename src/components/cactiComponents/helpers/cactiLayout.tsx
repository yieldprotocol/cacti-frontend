/**
 * Block Element for displaying a block of cacti Responses
 */
export const ResponseGrid = (props: any) => <div>{...props.children}</div>;

/**
 * Simple Row Element for displaying a single line of responses
 * note spread operator on the children prop, to allow for multiple children.
 */
export const ResponseRow = (props: any) => (
  <div className="flex items-center gap-2">{[...props.children]}</div>
);

/**
 * Generic Element for wrapping responses. 
 * Border and padding are applied here.
 * @param props 
 * @returns 
 */
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



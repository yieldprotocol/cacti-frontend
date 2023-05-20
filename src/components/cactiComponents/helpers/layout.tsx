/**
 * Grid Element for displaying a block of cacti Responses
 */
export const ResponseGrid = (props: any) => <div>{props.children}</div>;

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
    flex
    flex-grow
    flex-col
    rounded-[8px]
    border-[1px] border-white border-opacity-10 text-sm
    text-white text-opacity-75 hover:border-opacity-20 
    ${props.classNameExtra}
    w-max-[400px]
    p-1
  `}
  >
    {props.children}
  </div>
);

/**
 * Response Title Element
 *
 * props.title string
 * props.children: JSX.element
 *
 * Childern get rendered as a button on the right of  the title element
 *
 */
export const ResponseTitle = (props: any) => (
  <div className={`flex justify-between rounded-[8px] p-2 text-sm text-white text-opacity-70`}>
    {props.children}
  </div>
);

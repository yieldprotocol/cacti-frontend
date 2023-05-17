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

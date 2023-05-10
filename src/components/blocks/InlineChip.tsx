/**
 * Inline Chips are Elements that represent an Icon that repre sents a service, app, contract, address or token a user interacts with.
 *
 * Includes: Image Text
 */
export const InlineChip = (props: any) => {
  return (
    <div
      className={`inline-block w-full cursor-pointer justify-center rounded-xl bg-gray-600 px-6 py-2.5 text-center text-sm font-bold leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg disabled:bg-gray-500 ${props.className}`}
    ></div>
  );
};

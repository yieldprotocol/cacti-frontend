export const Button = (props) => {
  return (
    <button
      className="text-md inline-block cursor-pointer rounded-xl bg-blue-600 px-6 py-2.5 font-bold leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg disabled:cursor-default disabled:bg-gray-500"
      {...props}
    />
  );
};

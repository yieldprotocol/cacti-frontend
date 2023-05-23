export const ActionStepper = () => {
  return (
<div>
  <h2 className="sr-only">Steps</h2>

  <div>
    <ol
      className="grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:grid-cols-3"
    >
      <li className="flex items-center justify-center gap-2 p-4">
        <svg
          className="h-7 w-7 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
          />
        </svg>

        <p className="leading-none">
          <strong className="block font-medium"> Token Approval </strong>
          <small className="mt-1">  Allow uniswap to use your USDC </small>
        </p>
      </li>

      <li
        className="relative flex items-center justify-center gap-2 bg-gray-50 p-4"
      >
        <span
          className="absolute -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50 sm:block"
        >
        </span>

        <span
          className="absolute -right-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white sm:block"
        >
        </span>

        <svg
          className="h-7 w-7 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>

        <p className="leading-none">
          <strong className="block font-medium"> Address </strong>
          <small className="mt-1"> Where we sending it? </small>
        </p>
      </li>

      <li className="flex items-center justify-center gap-2 p-4">
        <svg
          className="h-7 w-7 shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          />
        </svg>

        <p className="leading-none">
          <strong className="block font-medium"> Payment </strong>
          <small className="mt-1"> Show us the money. </small>
        </p>
      </li>
    </ol>
  </div>
</div>
  );
};

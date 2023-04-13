import { CheckCircleIcon } from '@heroicons/react/24/outline';

export const SubmitButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="flex justify-between">
      <div className="mt-2 flex justify-center gap-3 self-end text-gray-400 md:gap-4 lg:mt-0 lg:translate-x-full lg:gap-1 lg:self-center lg:pl-2">
        <button
          onClick={onClick}
          className="rounded-md bg-green-700 p-1 text-gray-200 hover:bg-green-600 hover:text-gray-100 enabled:hover:cursor-pointer disabled:bg-gray-700 disabled:hover:text-gray-400"
        >
          Save & Submit
        </button>
      </div>
    </div>
  );
};

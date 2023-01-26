import { Modal } from "@/components/Modal";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const DebugButton = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="align-center inline-block font-bold rounded-xl bg-gray-700 px-6 py-2.5 text-md leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-gray-800 hover:shadow-lg focus:bg-gray-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg"
      >
        Debug <ArrowTopRightOnSquareIcon className="h-5 w-5 inline" />
      </button>
      <Modal openState={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

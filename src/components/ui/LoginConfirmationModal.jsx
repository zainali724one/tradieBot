import React from "react";
import PrimaryButton from "../PrimaryButton"; // Adjust path if needed

const LoginConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  confirmButtonLoading = false,
  cancelButtonLoading = false,
  confirmButtonLoadingText,
  cancelButtonLoadingText,
  icon,
}) => {
  if (!isOpen) return null;

  const defaultTrashIcon = (
    <div className=" rounded-full p-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#D3DCE5] rounded-lg shadow-xl w-11/12 md:max-w-md mx-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Icon (Trash Can) */}
        <div className="flex justify-start mb-4 ">
          <div className="flex mb-4 bg-[#D3DCE5]">
            {icon ? icon : defaultTrashIcon}{" "}
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800 justify-start mb-2">
          {title}
        </h2>

        {/* Message */}
        <p className="text-gray-800 justify-start mb-6">{message}</p>

        {/* Buttons using PrimaryButton */}
        <div className="flex flex-col space-y-3">
        

          <PrimaryButton
            onClick={onClose}
            color="#5290C1" // Use a "blue" color prop for the cancel button
            loading={cancelButtonLoading}
            loadingText={cancelButtonLoadingText}
            className="py-3 px-4 rounded-lg" // Additional Tailwind classes
          >
            {cancelButtonText}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default LoginConfirmationModal;

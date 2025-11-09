import React, { useState } from "react";

import CustomInput from "./ui/Input";
import PropTypes from "prop-types";
import Text from "./ui/Text";

// const LabeledInput = ({
//   type,
//   value,
//   onChange,
//   placeholder,
//   label,
//   prefix,
//   postfix,
//   error,
// }) => {
//   return (
//     <div>
//       <Text children={label} className="text-[14px] font-[500] mt-1" />
//       <div
//         className="w-[100%] h-[50px] rounded-[10px] relative flex items-center mt-1"
//         style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
//       >
//         {prefix && (
//           <span className="absolute left-3 flex items-center pointer-events-none">
//             {prefix}
//           </span>
//         )}
//         <CustomInput
//           type={type}
//           value={value}

//           onChange={onChange}
//           placeholder={placeholder}
//           className={`w-[100%] h-[50px]  outline-none   ${
//             prefix ? "pl-10" : "pl-2.5"
//           } ${postfix ? "pr-10" : ""}`}
//         />
//         {postfix && (
//           <span className="absolute right-3 flex items-center pointer-events-none">
//             {postfix}
//           </span>
//         )}
//       </div>
//       <p className="text-red-500 text-sm pl-1">
//       {error}
//       </p>
//     </div>
//   );
// };
// LabeledInput.propTypes = {
//   type: PropTypes.string,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   label: PropTypes.string,
//   prefix: PropTypes.node,
//   postfix: PropTypes.node,

// };

// LabeledInput.defaultProps = {
//   type: "text",
//   value: "",
//   placeholder: "",
//   className: "",
//   style: {},
//   prefix: null,
//   postfix: null,
// };
// export default LabeledInput;

const LabeledInput = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  prefix,
  postfix,
  error,
  helpText, // New prop for instructions
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper function to render help text as a list
  const renderHelpText = () => {
    if (!helpText) return null;
    // Split the instructions by comma, trim whitespace, and filter empty strings
    const instructions = helpText
      .split(",")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    return (
      <ul className="list-decimal list-inside text-gray-700 space-y-2">
        {instructions.map((line, index) => (
          <li key={index} className="text-sm">
            {/* Capitalize the first letter of each step */}
            {line.charAt(0).toUpperCase() + line.slice(1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-1.5 mb-1">
        <Text children={label} className="text-[14px] font-[500]" />
        {/* Help Icon: Renders if helpText prop is provided */}
        {helpText && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
            aria-label={`Show help for ${label}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.51c.39-.39 1.023-.39 1.414 0l.06.06c.39.39.39 1.023 0 1.414-.39.39-1.023.39-1.414 0l-.06-.06c-.39-.39-.39-1.023 0-1.414zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8.25c1.243 0 2.25.98 2.25 2.188 0 .414-.119.805-.33 1.156a3.37 3.37 0 00-.83 1.28A3.37 3.37 0 0012.75 15h.001v.002a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.488-.696 2.625 2.625 0 00.862-1.22c.16-.3.25-.63.25-.979 0-.68-.507-1.218-1.125-1.218-.46 0-.88.27-1.06.688A.75.75 0 019 10.188c0-1.208 1.007-2.188 2.25-2.188z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
      </div>

      <div
        className="w-full h-[50px] rounded-[10px] relative flex items-center"
        style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
      >
        {prefix && (
          <span className="absolute left-3 flex items-center pointer-events-none">
            {prefix}
          </span>
        )}
        <CustomInput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-full bg-transparent rounded-[10px] outline-none ${
            prefix ? "pl-10" : "pl-3"
          } ${postfix ? "pr-10" : "pr-3"}`}
        />
        {postfix && (
          <span className="absolute right-3 flex items-center pointer-events-none">
            {postfix}
          </span>
        )}
      </div>
      <p className="text-red-500 text-sm pl-1 h-5">{error}</p>

      {/* Help Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-xl w-11/12 max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-lg font-semibold text-gray-800">
                Instructions for {label}
              </h4>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-700"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Render formatted instructions */}
            {renderHelpText()}
          </div>
        </div>
      )}
    </div>
  );
};

export default LabeledInput;

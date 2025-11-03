// components/AddressSelector.js
import React from "react";
import Text from "./ui/Text"; // Assuming you have this from LabeledInput


const AddressSelector = ({ label, value, onClick, placeholder, error }) => {
  return (
    <div>
      <Text children={label} className="text-[14px] font-[500] mt-1" />
      <div
        className="w-[100%] h-[50px] rounded-[10px] relative flex items-center mt-1 cursor-pointer"
        style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
        onClick={onClick} // This triggers the modal
      >
        <span
          className={`w-[100%] h-[50px] outline-none pl-2.5 flex items-center ${
            value ? "text-black" : "text-gray-400"
          }`}
        >
          {value || placeholder}
        </span>
      </div>
      <p className="text-red-500 text-sm pl-1">{error}</p>
    </div>
  );
};

export default AddressSelector;

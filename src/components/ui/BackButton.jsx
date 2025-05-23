// components/BackButton.jsx
import React from "react";
// import arrowback from "../assets/icons/arrow_back.png";
import arrowback from "../../assets/icons/arrow_back.png";

const BackButton = ({ onClick, className = "" }) => {
  return (
    <button onClick={onClick} className={`flex items-center ${className}`}>
      <img src={arrowback} alt="Back" className="w-5 h-5" />
    </button>
  );
};

export default BackButton;

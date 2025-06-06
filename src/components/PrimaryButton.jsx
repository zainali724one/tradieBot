import React from "react";

import Button from "./ui/Button";
import propTypes from "prop-types";

const PrimaryButton = ({
  onClick,
  children,
  type,
  disabled,
  className,
  style,
  props,
  color,
  loading,
  loadingText,
}) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
      className={
        `${
          color === "red" ? "bg-[#E81E1E]" : "bg-[#5290C1]"
        } font-[700] rounded-[10px] text-[16px] w-[100%] text-white h-[50px] cursor-pointer flex items-center justify-center ` +
        className
      }
      style={style}
      {...props}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
          {loadingText || "Loading..."}
        </>
      ) : (
        children
      )}
    </Button>
  );
};

PrimaryButton.propTypes = {
  onClick: propTypes.func,
  children: propTypes.node.isRequired,
  type: propTypes.string,
  disabled: propTypes.bool,
  className: propTypes.string,
  style: propTypes.object,
  props: propTypes.any,
  color: propTypes.string,
  loading: propTypes.bool,
  loadingText: propTypes.string,
};

PrimaryButton.defaultProps = {
  onClick: () => {},
  type: "button",
  disabled: false,
  className: "",
  style: {},
  props: {},
  loading: false,
  loadingText: "Loading...",
};

export default PrimaryButton;

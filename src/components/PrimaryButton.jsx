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
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        children={children}
        type={type}
        disabled={disabled}
        className={
          `${
            color === "red" ? "bg-[#E81E1E]" : "bg-[#5290C1]"
          } font-[700] rounded-[10px] text-[16px] w-[100%] text-white h-[50px]  ` +
          className
        }
        style={style}
        props={props}
      />
    </>
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
};

PrimaryButton.defaultProps = {
  onClick: () => {},
  type: "button",
  disabled: false,
  className: "",
  style: {},
  props: {},
};
export default PrimaryButton;

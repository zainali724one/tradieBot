import React from "react";
import PropTypes from "prop-types";

const Button = ({
  onClick,
  children,
  type,
  disabled,
  className,
  style,
  props,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  props: PropTypes.any,
};

Button.defaultProps = {
  onClick: () => {},
  type: "button",
  disabled: false,
  className: "",
  style: {},
  props: {},
};

export default Button;

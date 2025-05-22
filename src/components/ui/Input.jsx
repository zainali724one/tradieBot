import React from "react";
import PropTypes from "prop-types";

const CustomInput = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  style,
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      style={style}
    />
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

CustomInput.defaultProps = {
  type: "text",
  value: "",
  placeholder: "",
  className: "",
  style: {},
};

export default CustomInput;

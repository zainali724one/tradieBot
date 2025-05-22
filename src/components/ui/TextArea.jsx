import React from "react";
import PropTypes from "prop-types";

const TextArea = ({
  value,
  onChange,
  placeholder,
  rows,
  cols,
  className,
  style,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      cols={cols}
      className={className}
      style={style}
    />
  );
};

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
};

TextArea.defaultProps = {
  placeholder: "",
  rows: 4,
  cols: 50,
  className: "",
  style: {},
};

export default TextArea;

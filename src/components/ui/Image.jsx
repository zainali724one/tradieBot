import React from "react";
import PropTypes from "prop-types";

const Image = ({ src, alt, width, height, style, className }) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={style}
      className={className}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  style: PropTypes.object,
  className: PropTypes.string,
};

Image.defaultProps = {
  width: "auto",
  height: "auto",
  style: {},
  className: "",
};

export default Image;

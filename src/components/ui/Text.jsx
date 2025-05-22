import React from "react";
import PropTypes from "prop-types";

const Text = ({ children, className, ...props }) => {
  return (
    <p className={className} {...props}>
      {children}
    </p>
  );
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Text;

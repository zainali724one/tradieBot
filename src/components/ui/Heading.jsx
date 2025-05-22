import React from "react";
import PropTypes from "prop-types";

const Heading = ({ level, children, className, ...props }) => {
  const Tag = `h${level}`;

  return (
    <Tag className={className} {...props}>
      {children}
    </Tag>
  );
};

Heading.propTypes = {
  level: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Heading.defaultProps = {
  level: 1,
  className: "",
};

export default Heading;

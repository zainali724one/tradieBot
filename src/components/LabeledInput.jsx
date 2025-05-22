import React from "react";
import CustomInput from "./ui/Input";
import PropTypes from "prop-types";
import Text from "./ui/Text";

const LabeledInput = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  prefix,
  postfix,
}) => {
  return (
    <div>
      <Text children={label} className="text-[14px] font-[500] mt-1" />
      <div
        className="w-[100%] h-[50px] rounded-[10px] relative flex items-center mt-1"
        style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
      >
        {prefix && (
          <span className="absolute left-3 flex items-center pointer-events-none">
            {prefix}
          </span>
        )}
        <CustomInput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-[100%] h-[50px]  outline-none   ${
            prefix ? "pl-10" : "pl-2.5"
          } ${postfix ? "pr-10" : ""}`}
        />
        {postfix && (
          <span className="absolute right-3 flex items-center pointer-events-none">
            {postfix}
          </span>
        )}
      </div>
    </div>
  );
};
LabeledInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  //   className: PropTypes.string,
  //   style: PropTypes.object,
};

LabeledInput.defaultProps = {
  type: "text",
  value: "",
  placeholder: "",
  className: "",
  style: {},
  prefix: null,
  postfix: null,
};
export default LabeledInput;

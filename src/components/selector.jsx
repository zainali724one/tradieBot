import React from "react";
import PropTypes from "prop-types";
import CustomInput from "./ui/Input";
import Text from "./ui/Text";

const Selector = ({
  type,
  value,
  onChange,
  placeholder,
  label,
  prefix,
  postfix,
  options, // NEW PROP FOR SELECT OPTIONS
}) => {
  return (
    <div>
      <Text children={label} className="text-[14px] font-[500] mt-1" />
      <div
        className="w-full h-[50px] rounded-[10px] relative flex items-center mt-1"
        style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
      >
        {prefix && (
          <span className="absolute left-3 flex items-center pointer-events-none">
            {prefix}
          </span>
        )}
        {type === "select" ? (
          <select
            value={value}
            onChange={onChange}
            className={`w-full h-[50px] bg-transparent outline-none appearance-none ${
              prefix ? "pl-10" : "pl-2.5"
            } ${postfix ? "pr-10" : ""}`}
          >
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <CustomInput
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full h-[50px] outline-none ${
              prefix ? "pl-10" : "pl-2.5"
            } ${postfix ? "pr-10" : ""}`}
          />
        )}
        {postfix && (
          <span className="absolute right-3 flex items-center pointer-events-none">
            {postfix}
          </span>
        )}
      </div>
    </div>
  );
};

Selector.propTypes = {
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  prefix: PropTypes.node,
  postfix: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ),
};

Selector.defaultProps = {
  type: "text",
  value: "",
  placeholder: "",
  prefix: null,
  postfix: null,
  options: [],
};

export default Selector;

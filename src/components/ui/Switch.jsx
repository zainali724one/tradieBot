import React from "react";
import { Switch } from "antd";

const CustomSwitch = ({
  checked,
  onChange,
  size = "default",
  disabled = false,
  loading = false,
  label,
  labelPosition = "right",
  color = "#4CAF50", 
}) => {
  
  const switchStyle = {
    backgroundColor: checked ? color : undefined,
  };

  
  const containerClass =
    labelPosition === "left"
      ? "flex items-center flex-row-reverse"
      : "flex items-center";
  const labelMarginClass = labelPosition === "left" ? "ml-2" : "mr-2";

  return (
    <div className={containerClass}>
      {label && <span className={labelMarginClass}>{label}</span>}
      <Switch
        checked={checked}
        onChange={onChange}
        size={size}
        disabled={disabled}
        loading={loading}
        style={switchStyle}
      />
    </div>
  );
};

export default CustomSwitch;

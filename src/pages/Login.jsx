import React, { useState } from "react";
import Image from "../components/ui/Image";
import logo from "../assets/logo.png";
import Text from "../components/ui/Text";
import LabeledInput from "../components/LabeledInput";
import i3 from "../assets/icons/i3.png";
import i5 from "../assets/icons/i5.png";
import PrimaryButton from "../components/PrimaryButton";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../reactQuery/mutations/auth";
import { Spin } from "antd";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading } = useLogin();
  console.log("isLoading", isLoading);
  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log("Form Data:", form);
    login(form);

    // navigate("/quoteform");
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#D3DCE5] w-[100%] h-[100dvh] flex flex-col items-center overflow-y-scroll pb-3.5">
      <Image src={logo} className="object-cover mt-10" />
      <div className="w-[90%]">
        <Text children="Login" className="font-[600] text-[20px]" />
        <Text
          children="Enter your details to get access."
          className="font-[500] text-[14px] mt-2"
        />
      </div>

      <div className="w-[90%] mt-8">
        <LabeledInput
          label="Email"
          prefix={<img src={i3} className="h-[14px] w-[18px]" />}
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange("email")}
        />

        <div className="mt-3.5">
          <LabeledInput
            label="Password"
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange("password")}
          />
          <div className="flex justify-end">
            <Button
              className="font-[600] text-[12px] cursor-pointer text-[#5290C1]"
              children="Forgot the password?"
              onClick={() => navigate("/forgetpassword")}
            />
          </div>
        </div>

        <div className="mt-3.5 w-[100%]">
          <PrimaryButton
            children="Login"
            color="blue"
            onClick={() => handleSubmit()}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;

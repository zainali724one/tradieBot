import React, { useState } from "react";

import { useLogin } from "../reactQuery/mutations/auth";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Image from "../components/ui/Image";
import Text from "../components/ui/Text";
import i3 from "../assets/icons/i3.png";
import i5 from "../assets/icons/i5.png";
import logo from "../assets/logo.png";
// import { toast } from "react-toastify";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

const Login = () => {
  const { login, isLoading } = useLogin();

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!form.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      errors.email = "Invalid email format";
    }

    if (!form.password) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      // toast.error("Please fix the errors before Login.");
      return;
    }
    login(form);
  };

  const handlesignup = () => {
    navigate("/");
  };
  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="bg-[#D3DCE5] w-[100%] max-h-[100vh] h-[100%] flex flex-col items-center overflow-y-scroll pb-3.5">
      <div className="w-full pt-16 ml-6">
        <header className="flex justify-start">{/* <BackButton /> */}</header>
      </div>
      <Image src={logo} className="object-cover mt-2" />
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
          error={formErrors.email}
          value={form.email}
          onChange={handleChange("email")}
        />

        <div className="mt-3.5">
          <LabeledInput
            label="Password"
            prefix={
              <img
                src={i5}
                className="h-[18px] w-[16px]"
                onClick={() => console.log("zain")}
              />
            }
            postfix={
              showPass ? (
                <FaRegEye
                  className="text-[#5290C1]  text-xl cursor-pointer"
                  onClick={() => {
                    setShowPass(!showPass), console.log("working");
                  }}
                />
              ) : (
                <FaRegEyeSlash
                  className="text-[#5290C1] text-xl cursor-pointer"
                  onClick={() => setShowPass(!showPass)}
                />
              )
            }
            // postfixOnClick={() => setShowPass(!showPass)}
            type={showPass ? "text" : "password"}
            placeholder="Enter password"
            error={formErrors.password}
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
            loading={isLoading}
            loadingText="Loading..."
          />
        </div>

        <div className="font-[500] text-[14px] flex justify-center mt-[10px] gap-2">
          Don’t have an account?
          <button
            onClick={handlesignup}
            className="text-[#5290C1] hover:text-[#5290C1]"
          >
            Signup{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

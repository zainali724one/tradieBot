import React, { useState } from "react";

import { useSendOtp } from "../reactQuery/mutations/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import Image from "../components/ui/Image";
import Text from "../components/ui/Text";
import i3 from "../assets/icons/i3.png";
import logo from "../assets/logo.png";

const ForgetPassword = () => {
  const { sendotp, isLoading } = useSendOtp();

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (formData.email.length < 6) {
      errors.email = "Email must be at least 6 characters";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before ForgetPassword.");
      return;
    }

    sendotp(formData, {
      onSuccess: (data) => {
        toast.success("OTP has been sent successfully.");
        navigate("/verifyotp", { state: { email: formData.email } });
      },
      onError: (error) => {
        // console.error("Failed to send OTP", error);
        toast.error(error.message);
      },
    });
  };

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <div className="bg-[#D3DCE5] w-[100%] h-[100dvh] flex flex-col items-center overflow-y-scroll pb-3.5">
      <div className="w-full pt-16 ml-6">
        <header className="flex justify-start">
          <BackButton />
        </header>
      </div>
      <Image src={logo} className="object-cover mt-2" />
      <div className="w-[90%] mt-5">
        <Text children="Forgot Password" className="font-[600] text-[20px]" />
        <Text
          children="We will send an OTP to your registered email address ."
          className="font-[500] text-[14px] mt-2"
        />
      </div>

      <div className="w-[90%] mt-8">
        <LabeledInput
          label="Email"
          value={formData.email}
          error={formErrors.email}
          onChange={handleChange("email")}
          prefix={<img src={i3} className="h-[14px] w-[18px]" />}
          placeholder="Enter email"
        />

        <div className="mt-5 w-[100%]">
          <PrimaryButton
            disabled={isLoading}
            loading={isLoading}
            loadingText="Loading..."
            onClick={handleSubmit}
            children="Send OTP"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

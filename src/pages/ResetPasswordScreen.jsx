import React, { useState } from "react";

import { useResetPassword } from "../reactQuery/mutations/auth";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import Image from "../components/ui/Image";
import Text from "../components/ui/Text";
import i5 from "../assets/icons/i5.png";
import logo from "../assets/logo.png";

const ResetPasswordScreen = () => {
  const { resetPassword, isLoading } = useResetPassword();

  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    let errors = {};
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters, include 1 uppercase letter and 1 special character";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before Verify.");
      return;
    }

    const payload = {
      email: emailFromState,
      newPassword: password,
    };

    resetPassword(payload, {
      onSuccess: () => {
        toast.success("Password reset successfully!");
      },
      onError: (error) => {
        toast.error(error.message || "Something went wrong.");
      },
    });
  };

  // if (isLoading) return <Loading />;

  return (
    <div className="bg-[#D3DCE5] w-full h-[100dvh] flex flex-col items-center overflow-y-scroll pb-3.5">
      <div className="w-full pt-16 ml-10">
        <header className="flex justify-start">
          <BackButton />
        </header>
      </div>
      <Image src={logo} className="object-cover mt-2" />
      <div className="w-[90%] mt-5">
        <Text children="Reset Password" className="font-[600] text-[20px]" />
        <Text
          children={`You can now reset your password.`}
          className="font-[500] text-[14px] mt-2"
        />
      </div>

      <div className="w-[90%] mt-8">
        <div>
          <LabeledInput
            label="Password"
            id="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={formErrors.password}
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter your new password"
          />
        </div>

        <div className="mt-4">
          <LabeledInput
            label="Confirm Password"
            id="ConfirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={formErrors.confirmPassword}
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Confirm your new password"
          />
        </div>

        <div className="mt-5 w-full">
          <PrimaryButton
            disabled={isLoading}
            loading={isLoading}
            loadingText="Loading..."
            onClick={handleSubmit}
            children="Verify"
            color="blue"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;

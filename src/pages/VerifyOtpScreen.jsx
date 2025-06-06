import React, { useState } from "react";

import { useSendOtp, useVerifyOtp } from "../reactQuery/mutations/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OTPInput from "react-otp-input";

import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/ui/BackButton";
import Image from "../components/ui/Image";
import Text from "../components/ui/Text";
import logo from "../assets/logo.png";

const VerifyOtpScreen = () => {
  const { verifyOtp, isLoading } = useVerifyOtp();

  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { sendotp } = useSendOtp();
  const navigate = useNavigate();

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const handleResendOtp = () => {
    const sendverifyotp = {
      email: emailFromState,
    };
    sendotp(sendverifyotp, {
      onSuccess: (data) => {
        toast.success("OTP Send successfully");
      },
      onError: (error) => {
        // console.error("Failed to send OTP", error);
        toast.error(error.message);
      },
    });
  };
  const handleSubmit = () => {
    const sendverifyotp = {
      email: emailFromState,
      otp: otp,
    };
    verifyOtp(sendverifyotp, {
      onSuccess: (data) => {
        toast.success("OTP Verify successfully");
        navigate("/resetpassword", { state: { email: emailFromState } });
      },
      onError: (error) => {
        // console.error("Failed to send OTP", error);
        toast.error(error.message);
      },
    });
  };

  // if (isLoading) {
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   );
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
        <Text children="Verify OTP" className="font-[600] text-[20px]" />
        <Text
          children={`We have sent an OTP to ${emailFromState}`}
          className="font-[500] text-[14px] mt-2"
        />
      </div>

      <div className="w-[90%] mt-8">
        <OTPInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          inputStyle={{
            width: "2.5rem",
            justifyContent: "center",
            margin: "auto",
            height: "2.5rem",

            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",

            fontSize: "1rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            textAlign: "center",
          }}
          renderInput={(props) => <input {...props} />}
        />

        <div className="font-[500] text-[14px] mt-2">
          Didn’t you receive the OTP?{" "}
          <button
            onClick={handleResendOtp}
            className="text-[#5290C1] underline hover:text-[#5290C1]"
          >
            Resend OTP
          </button>
        </div>

        <div className="mt-5 w-[100%]">
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

export default VerifyOtpScreen;

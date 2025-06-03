import React, { useEffect, useState } from "react";
import Image from "../components/ui/Image";
import logo from "../assets/logo.png";
import Text from "../components/ui/Text";
import PrimaryButton from "../components/PrimaryButton";
import { useResetPassword, useSendOtp, useVerifyOtp } from "../reactQuery/mutations/auth";
import OTPInput from "react-otp-input";
import i5 from "../assets/icons/i5.png";

import { useLocation, useNavigate } from "react-router-dom";
import LabeledInput from "../components/LabeledInput";
import Loading from "../components/Loading";

const ResetPasswordScreen = () => {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const { resetPassword,isLoading } = useResetPassword();

  const handleSubmit = () => {
    // verifyOtp(formData);
    const sendverifyotp = {
      email: emailFromState,
      newPassword:password,
    //   otp: otp,
    };
    resetPassword(sendverifyotp);
  };


  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <div className="bg-[#D3DCE5] w-[100%] h-[100dvh] flex flex-col items-center overflow-y-scroll pb-3.5">
      <Image src={logo} className="object-cover mt-10" />
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
                   prefix={<img src={i5} className="h-[18px] w-[16px]" />}
                   placeholder="Enter your old password"
          
                 />
               </div>
       
               <div className="mt-4">
                 <LabeledInput
                   label=" Confirm Password"
                   id="newPassword"
                   prefix={<img src={i5} className="h-[18px] w-[16px]" />}
                   placeholder="Enter your new password"
                   value={confirmPassword}
                   onChange={(e) => setConfirmPassword(e.target.value)}
             
                 />
               </div>

        <div className="mt-5 w-[100%]">
          <PrimaryButton
            // onClick={() => signup(formData)}
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

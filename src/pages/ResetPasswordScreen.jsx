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

const ResetPasswordScreen = () => {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const { resetPassword } = useResetPassword();

  const handleSubmit = () => {
    // verifyOtp(formData);
    const sendverifyotp = {
      email: emailFromState,
      otp: otp,
    };
    resetPassword(sendverifyotp);
  };

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
                   label="Old Password"
                   id="oldPassword"
                   prefix={<img src={i5} className="h-[18px] w-[16px]" />}
                   placeholder="Enter your old password"
                //    value={formData.oldPassword}
                //    onChange={handleChange}
                 />
               </div>
       
               <div className="mt-4">
                 <LabeledInput
                   label="New Password"
                   id="newPassword"
                   prefix={<img src={i5} className="h-[18px] w-[16px]" />}
                   placeholder="Enter your new password"
                //    value={formData.newPassword}
                //    onChange={handleChange}
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

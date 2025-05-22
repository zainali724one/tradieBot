import React from "react";
import Image from "../components/ui/Image";
import logo from "../assets/logo.png";
import Text from "../components/ui/Text";
import LabeledInput from "../components/LabeledInput";
import i3 from "../assets/icons/i3.png";
import PrimaryButton from "../components/PrimaryButton";
// import Button from "../components/ui/Button";

const ForgetPassword = () => {
  return (
    <div className="bg-[#D3DCE5] w-[100%] h-[100dvh] flex flex-col items-center overflow-y-scroll pb-3.5">
      <Image src={logo} className="object-cover mt-10" />
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
          prefix={<img src={i3} className="h-[14px] w-[18px]" />}
          placeholder="Enter email"
        />

        <div className="mt-5 w-[100%]">
          <PrimaryButton children="Send OTP" color="blue" />
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

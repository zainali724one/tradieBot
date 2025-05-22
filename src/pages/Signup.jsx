import React from "react";
import Image from "../components/ui/Image";
import logo from "../assets/logo.png";
import Text from "../components/ui/Text";
import LabeledInput from "../components/LabeledInput";
import i1 from "../assets/icons/i1.png";
import i2 from "../assets/icons/i2.png";
import i3 from "../assets/icons/i3.png";
import i4 from "../assets/icons/i4.png";
import i5 from "../assets/icons/i5.png";
import PrimaryButton from "../components/PrimaryButton";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#D3DCE5] w-[100%] h-[100dvh] flex flex-col items-center overflow-y-scroll pb-8">
      <Image src={logo} className="object-cover mt-10" />
      <div className="w-[90%]">
        <Text children="Signup" className="font-[600] text-[20px]" />
        <Text
          children="Enter your details to get access."
          className="font-[500] text-[14px] mt-2"
        />
      </div>

      <div className="w-[90%] mt-8">
        <LabeledInput
          label="Name"
          prefix={<img src={i1} className="h-[18px] w-[18px]" />}
          placeholder="Enter your name"
        />
        <div className="mt-3.5">
          <LabeledInput
            label="Phone"
            prefix={<img src={i2} className="h-[18px] w-[18px]" />}
            placeholder="Enter phone number"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Email"
            prefix={<img src={i3} className="h-[14px] w-[18px]" />}
            placeholder="Enter email"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Country"
            prefix={<img src={i4} className="h-[18px] w-[18px]" />}
            placeholder="Enter country"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Password"
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter password"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Confirm Password"
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter confirm password"
          />
        </div>

        <div className="mt-3.5 w-[100%]">
          <PrimaryButton children="Signup" color="blue" />
        </div>
      </div>

      <div className="flex items-center mt-2.5 gap-1.5">
        <Text
          className="text-[14px] font-[400] "
          children="Already have an account?"
        />
        <Button
          className="font-[600] text-[14px] text-[#5290C1]"
          children="Login"
          onClick={() => navigate("/signin")}
        />
      </div>
    </div>
  );
};

export default Signup;

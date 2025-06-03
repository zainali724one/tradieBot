import React, { useEffect, useState } from "react";
import Image from "../components/ui/Image";
import logo from "../assets/logo.png";
import Text from "../components/ui/Text";
import PrimaryButton from "../components/PrimaryButton";
import { useSendOtp, useVerifyOtp } from "../reactQuery/mutations/auth";
import OTPInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../components/Loading";

const VerifyOtpScreen = () => {
  const [otp, setOtp] = useState("");
  const {sendotp} = useSendOtp()
  const navigate=useNavigate();

  const location = useLocation();
  const emailFromState = location.state?.email || "";

  const handleOtpChange = (otpValue) => {
    setOtp(otpValue);
  };

  const { verifyOtp,isLoading  } = useVerifyOtp();

//   const handleResendOtp = () => {
//     const sendverifyotp = {
//       email: emailFromState,
//     //   otp: otp,
//     };
//     sendotp(sendverifyotp);
//   };


const handleResendOtp = () => {
    const sendverifyotp = {
        email: emailFromState,
        // otp: otp,
      };
      sendotp(sendverifyotp, {
      onSuccess: (data) => {
        // console.log("OTP Verify successfully", data);
        toast.success(
            "OTP Send successfully"
        )
        // navigate("/resetpassword", { state: { email: emailFromState } });
      },
      onError: (error) => {
        console.error("Failed to send OTP", error);
        toast.error(error.message);
        // Show an error message if needed
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
        // console.log("OTP Verify successfully", data);
        toast.success(
            "OTP Verify successfully"
        )
        navigate("/resetpassword", { state: { email: emailFromState } });
      },
      onError: (error) => {
        console.error("Failed to send OTP", error);
        toast.error(error.message);
        // Show an error message if needed
      },
    });
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

            // margin: "0 0.3rem",
            boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)", // Inner shadow

            fontSize: "1rem",
            borderRadius: 8,
            border: "1px solid #ccc",
            textAlign: "center",
          }}
          renderInput={(props) => <input {...props} />}
        />
        
        <div className="font-[500] text-[14px] mt-2">
  Didn’t you receive the OTP?{' '}
  <button 
  onClick={handleResendOtp}
   className="text-blue-600 underline hover:text-blue-800">
    Resend OTP
  </button>
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

export default VerifyOtpScreen;

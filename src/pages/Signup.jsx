import React, { useEffect, useState } from "react";
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
// import { userSignup } from "../services/userService";
// import { userSignup } from "../api/auth/Signup";
import { useSignup } from "../reactQuery/mutations/auth";
import Loading from "../components/Loading";

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const { signup, isLoading } = useSignup();

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    console.log(">>>>>>>>>>........", ...formData);
  };
  const handleSubmit = () => {
    // Example validation or API call

    let useralldata = {
      // telegramId:userData?.telegramId,
      telegramId: "1224992255",
      username: "sufyan",
      // username:userData.username,
      name: formData?.name,
      email: formData?.email,
      phone: formData?.phone,
      password: formData?.password,
      country: formData?.country,
    };
    signup(useralldata);

    // console.log("Form data submitted:", formData);
  };

  useEffect(() => {
    const authenticatingUser = async () => {
      const tg = window?.Telegram?.WebApp;

      tg?.ready();
      if (tg?.initDataUnsafe?.user?.id) {
        const userId = tg.initDataUnsafe.user.id;
        const userIdString = userId.toString();
        // tg.trackEvent("home_page_viewed");
        // tg.trackEvent("app_opened");

        const telegramData = {
          telegramId: userIdString,
          firstName: tg?.initDataUnsafe?.user?.first_name,
          lastName: tg?.initDataUnsafe?.user?.last_name,
          username: tg?.initDataUnsafe?.user?.username,
          languageCode: tg?.initDataUnsafe?.user?.language_code,
          isPremium: tg?.initDataUnsafe?.user?.is_premium,
        };

        console.log("telegramData", telegramData);
        setUserData(telegramData);

        // userSignup(telegramData)
        //   .then((data) => {
        //     console.log(data);
        //     setUserData(data);
        //   })
        //   .catch((error) => {
        //     console.log(error || "An error occurred");
        //   });
      }
    };

    authenticatingUser();
  }, []);
  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }
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
          value={formData.name}
          onChange={handleChange("name")}
          prefix={<img src={i1} className="h-[18px] w-[18px]" />}
          placeholder="Enter your name"
        />
        <div className="mt-3.5">
          <LabeledInput
            label="Phone"
            value={formData.phone}
            onChange={handleChange("phone")}
            prefix={<img src={i2} className="h-[18px] w-[18px]" />}
            placeholder="Enter phone number"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Email"
            value={formData.email}
            onChange={handleChange("email")}
            prefix={<img src={i3} className="h-[14px] w-[18px]" />}
            placeholder="Enter email"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Country"
            value={formData.country}
            onChange={handleChange("country")}
            prefix={<img src={i4} className="h-[18px] w-[18px]" />}
            placeholder="Enter country"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter password"
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter confirm password"
          />
        </div>

        <div className="mt-3.5 w-[100%]">
          <PrimaryButton
            onClick={handleSubmit}
            children="Signup"
            color="blue"
          />
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

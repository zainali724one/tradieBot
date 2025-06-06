import React, { useEffect, useState } from "react";

import { useSignup } from "../reactQuery/mutations/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";
import { setTelegramId } from "../../src/store/telegramSlice";
import Button from "../components/ui/Button";
import Image from "../components/ui/Image";
import Text from "../components/ui/Text";
import i1 from "../assets/icons/i1.png";
import i2 from "../assets/icons/i2.png";
import i3 from "../assets/icons/i3.png";
import i4 from "../assets/icons/i4.png";
import i5 from "../assets/icons/i5.png";
import logo from "../assets/logo.png";

const Signup = () => {
  const telegramId = useSelector((state) => state.session.telegramId);
  const { signup, isLoading } = useSignup();
  const dispatch = useDispatch();

  const [userdata,setUserdata]= useState();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{6,}$/; // At least 6 digits, only numbers
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = "Phone number must be numeric and at least 6 digits";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (formData.email.length < 6) {
      errors.email = "Email must be at least 6 characters";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Country validation
    if (!formData.country.trim()) {
      errors.country = "Country is required";
    }

    // Password validation
    if (!formData.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formData.password)) {
      errors.password =
        "Password must be at least 8 characters, include 1 uppercase letter and 1 special character";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before Signup.");
      return;
    }

    let useralldata = {
      telegramId: "6794492093",
      username: "sufyan",
      name: formData?.name,
      email: formData?.email,
      phone: formData?.phone,
      password: formData?.password,
      country: formData?.country,
    };

    signup(useralldata);
  };

  useEffect(() => {
    const authenticatingUser = async () => {
      const tg = window?.Telegram?.WebApp;

      tg?.ready();
      if (tg?.initDataUnsafe?.user?.id) {
        const userId = tg.initDataUnsafe.user.id;
        const userIdString = userId.toString();

        const telegramData = {
          telegramId: userIdString,
          firstName: tg?.initDataUnsafe?.user?.first_name,
          lastName: tg?.initDataUnsafe?.user?.last_name,
          username: tg?.initDataUnsafe?.user?.username,
          languageCode: tg?.initDataUnsafe?.user?.language_code,
          isPremium: tg?.initDataUnsafe?.user?.is_premium,
        };

        setUserdata(telegramData)
        dispatch(setTelegramId(telegramData));
        console.log("telegramdata", telegramId?.telegramId);
      }
    };

    authenticatingUser();
  }, []);

  // if (isLoading) {
  //   return (
  //     <>
  //       <Loading />
  //     </>
  //   );
  // }

  return (
    <div className="bg-[#D3DCE5] w-[100%] h-[100dvh] flex flex-col items-center overflow-y-scroll pb-8">
      <Image src={logo} className="object-cover mt-10" />
      <div className="w-[90%]">
        <Text children="Signup" className="font-[600] text-[20px]" />
        <Text
          children="Enter your details to get access."
          className="font-[500] text-[14px] mt-2"
        />

{userdata && (
  <div className="mt-4">
    <Text className="text-[14px] font-[500] text-gray-700">
      Telegram ID: {userdata?.telegramId}
    </Text>
    <Text className="text-[14px] font-[500] text-gray-700">
        Username: @{userdata?.username}
      </Text>
   
  </div>
)}
      </div>

      <div className="w-[90%] mt-8">
        <LabeledInput
          label="Name"
          error={formErrors.name}
          value={formData.name}
          onChange={handleChange("name")}
          prefix={<img src={i1} className="h-[18px] w-[18px]" />}
          placeholder="Enter your name"
        />
        <div className="mt-3.5">
          <LabeledInput
            label="Phone"
            type="number"
            value={formData.phone}
            onChange={handleChange("phone")}
            prefix={<img src={i2} className="h-[18px] w-[18px]" />}
            placeholder="Enter phone number"
            error={formErrors.phone}
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Email"
            value={formData.email}
            onChange={handleChange("email")}
            prefix={<img src={i3} className="h-[14px] w-[18px]" />}
            placeholder="Enter email"
            error={formErrors.email}
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Country"
            value={formData.country}
            onChange={handleChange("country")}
            prefix={<img src={i4} className="h-[18px] w-[18px]" />}
            placeholder="Enter country"
            error={formErrors.country}
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Password"
            value={formData.password}
            onChange={handleChange("password")}
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter password"
            error={formErrors.password}
          />
        </div>

        <div className="mt-3.5">
          <LabeledInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange("confirmPassword")}
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter confirm password"
            error={formErrors.confirmPassword}
          />
        </div>

        <div className="mt-3.5 w-[100%]">
          <PrimaryButton
            onClick={handleSubmit}
            disabled={isLoading}
            loading={isLoading}
            loadingText="Loading..."
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

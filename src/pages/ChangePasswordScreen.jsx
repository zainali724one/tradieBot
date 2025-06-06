import { useState } from "react";

import { useChangePassword } from "../reactQuery/mutations/auth";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import i5 from "../assets/icons/i5.png";

function ChangePasswordScreen() {
  const { editChangePass, isLoading } = useChangePassword();

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdate = () => {
    const editchangePassword = {
      telegramId: "1224992255",
      oldPassword: formData?.oldPassword,
      newPassword: formData?.newPassword,
    };
    editChangePass(editchangePassword);
  };

  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Change Password
        </h1>
      </header>

      <div className="mt-8">
        <LabeledInput
          label="Old Password"
          id="oldPassword"
          prefix={<img src={i5} className="h-[18px] w-[16px]" />}
          placeholder="Enter your old password"
          value={formData.oldPassword}
          onChange={handleChange("oldPassword")}
        />
      </div>

      <div className="mt-4">
        <LabeledInput
          label="New Password"
          id="newPassword"
          prefix={<img src={i5} className="h-[18px] w-[16px]" />}
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange("newPassword")}
        />
      </div>

      <div className="mt-4">
        <LabeledInput
          label="Confirm Password"
          id="confirmPassword"
          prefix={<img src={i5} className="h-[18px] w-[16px]" />}
          placeholder="Enter your confirm password"
          value={formData.confirmPassword}
          onChange={handleChange("confirmPassword")}
        />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton
          onClick={() => handleUpdate()}
          disabled={isLoading}
          loading={isLoading}
          loadingText="Loading..."
          children={"Update"}
          type={"submit"}
        />
      </div>
    </div>
  );
}

export default ChangePasswordScreen;

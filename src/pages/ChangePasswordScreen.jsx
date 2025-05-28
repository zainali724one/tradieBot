import { useState } from "react";
import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";
import i5 from "../assets/icons/i5.png";
import BackButton from "../components/ui/BackButton";

function ChangePasswordScreen() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    // Basic validation example
    if (formData.newPassword !== formData.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    if (
      !formData.oldPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      alert("All fields are required!");
      return;
    }
    console.log("Update Password data:", formData);
    // Here you would typically send the data to a backend for password update
    // alert("Password updated (check console for data)");
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-[#D3DCE5]">
      <header className="flex items-center p-4 pt-10">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Change Password
        </h1>
      </header>

      <form onSubmit={handleUpdate} className="px-4 mt-8">
        <div>
          <LabeledInput
            label="Old Password"
            id="oldPassword"
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter your old password"
            value={formData.oldPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <LabeledInput
            label="New Password"
            id="newPassword"
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mt-4">
          <LabeledInput
            label="Confirm Password"
            id="confirmPassword"
            prefix={<img src={i5} className="h-[18px] w-[16px]" />}
            placeholder="Enter your confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <PrimaryButton children={"Update"} type={"submit"} />
        </div>
      </form>
    </div>
  );
}

export default ChangePasswordScreen;

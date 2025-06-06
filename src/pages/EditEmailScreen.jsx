import { useState } from "react";

import { useEditProfile } from "../reactQuery/mutations/auth";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import i3 from "../assets/icons/i3.png";

function EditEmailScreen() {
  const { editProfile, isLoading } = useEditProfile();

  const [formData, setFormData] = useState({
    oldEmail: "",
    newEmail: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdate = () => {
    const editnamedata = {
      type: "email",
      id: "1224992255",
      oldEmail: formData?.oldEmail,
      newEmail: formData?.newEmail,
    };
    editProfile(editnamedata);
  };

  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center  ">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Email
        </h1>
      </header>

      <div className="mt-8">
        <LabeledInput
          label="Old Email"
          value={formData?.oldEmail}
          // error={formErrors.email}

          onChange={handleChange("oldEmail")}
          prefix={<img src={i3} className="h-[14px] w-[18px]" />}
          placeholder="Enter your email"
        />
      </div>

      <div className="mt-4">
        <LabeledInput
          label="New Email"
          value={formData?.newEmail}
          // error={formErrors.email}

          onChange={handleChange("newEmail")}
          prefix={<img src={i3} className="h-[14px] w-[18px]" />}
          placeholder="Enter your email"
        />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton
          children="Update"
          disabled={isLoading}
          loading={isLoading}
          loadingText="Loading..."
          onClick={() => handleUpdate()}
          color="blue"
          type="submit"
        />
      </div>
    </div>
  );
}

export default EditEmailScreen;

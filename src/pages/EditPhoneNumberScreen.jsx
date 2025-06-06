import React, { useState } from "react";

import { useEditProfile } from "../reactQuery/mutations/auth";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import i2 from "../assets/icons/i2.png";

function EditPhoneNumberScreen() {
  const { editProfile, isLoading } = useEditProfile();

  const [formData, setFormData] = useState({
    oldPhoneNumber: "",
    newPhoneNumber: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdate = () => {
    const editnamedata = {
      type: "phone",
      id: "1224992255",
      oldPhone: formData?.oldPhoneNumber,
      newPhone: formData?.newPhoneNumber,
    };
    editProfile(editnamedata);
  };

  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Phone Number
        </h1>
      </header>

      <div className="mt-8">
        <LabeledInput
          label="Old Phone Number"
          prefix={<img src={i2} className="h-[18px] w-[18px]" />}
          id="oldPhoneNumber"
          placeholder="Enter your old phone number"
          value={formData.oldPhoneNumber}
          // error={formErrors.email}

          onChange={handleChange("oldPhoneNumber")}
          type="number"
        />
      </div>

      <div className="mt-4">
        <LabeledInput
          label="New Phone Number"
          id="newPhoneNumber"
          prefix={<img src={i2} className="h-[18px] w-[18px]" />}
          placeholder="Enter your new phone number"
          value={formData.newPhoneNumber}
          onChange={handleChange("newPhoneNumber")}
          type="number"
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

export default EditPhoneNumberScreen;

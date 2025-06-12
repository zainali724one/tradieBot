import { useEffect, useState } from "react";

import { useEditProfile } from "../reactQuery/mutations/auth";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import i1 from "../assets/icons/i1.png";
import { useSelector } from "react-redux";

function EditNameScreen() {
  const { editProfile, isLoading } = useEditProfile();
  const userId = useSelector((state) => state.session.userId);

  const [userData, setUserData] = useState({});

  const [formData, setFormData] = useState({
    oldName: "",
    newName: "",
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleUpdate = () => {
    const editnamedata = {
      type: "name",
      id: userId?.telegramId,
      name: formData?.newName,
    };
    editProfile(editnamedata);
  };

 

  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center ">
        <BackButton />

        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Name
        </h1>
      </header>

      <div className="mt-8">
        <LabeledInput
          label="Old Name"
          value={formData.oldName}
          // error={formErrors.email}

          onChange={handleChange("oldName")}
          prefix={<img src={i1} className="h-[14px] w-[18px]" />}
          placeholder="Enter your name"
        />
      </div>
      <div className="mt-4">
        <LabeledInput
          label="New Name"
          value={formData.newName}
          // error={formErrors.email}

          onChange={handleChange("newName")}
          prefix={<img src={i1} className="h-[14px] w-[18px]" />}
          placeholder="Enter your name"
        />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton
          disabled={isLoading}
          loading={isLoading}
          loadingText="Loading..."
          onClick={() => handleUpdate()}
          color="blue"
          children="Update"
        />
      </div>
    </div>
  );
}

export default EditNameScreen;

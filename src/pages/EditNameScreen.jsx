import { useEffect, useState } from "react";

import { useEditProfile } from "../reactQuery/mutations/auth";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import i1 from "../assets/icons/i1.png";

function EditNameScreen() {
  const { editProfile, isLoading } = useEditProfile();

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
      id: "1224992255",
      name: formData?.newName,
    };
    editProfile(editnamedata);
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

        setUserData(telegramData);
      }
    };

    authenticatingUser();
  }, []);

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

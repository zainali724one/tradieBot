import React, { useEffect, useState } from "react";

import { useEditProfile } from "../reactQuery/mutations/auth";

import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import BackButton from "../components/ui/BackButton";
import i2 from "../assets/icons/i2.png";
import { useSelector } from "react-redux";
import { Getuser } from "../api/auth/auth";

function EditPhoneNumberScreen() {
  const { editProfile, isLoading } = useEditProfile();
  const userId = useSelector((state) => state.session.userId);
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
      id: userId?.telegramId,
      newPhone: formData?.newPhoneNumber,
    };
    editProfile(editnamedata);
  };


   const returnUserData = async (telegramId) => {
        // 8141119319
    
        Getuser(telegramId)
          .then((res) => {
    
            setFormData((prevData) => ({
              ...prevData,
              newPhoneNumber: res?.user?.phone || "",
            }));
  
            
            console.log(res, "data is added");
          })
          .catch((err) => {
            // localStorage.removeItem("telegramid");
            // nevigate("/signin");
            console.log(err, "here is the error");
          });
        // return theUser;
      };
  
       const tg = window?.Telegram?.WebApp;
        console.log(tg.initDataUnsafe.user, "here is user");
        // const telegramUserData = tg.initDataUnsafe.user;
      
        tg?.ready();
        useEffect(() => {
          if (tg?.initDataUnsafe?.user?.id) {
            const userId = tg.initDataUnsafe.user.id;
            returnUserData(userId);
          }
        }, [tg?.initDataUnsafe?.user?.id]);

  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Phone Number
        </h1>
      </header>

      {/* <div className="mt-8">
        <LabeledInput
          label="Old Phone Number"
          prefix={<img src={i2} className="h-[18px] w-[18px]" />}
          id="oldPhoneNumber"
          placeholder="Enter your old phone number"
          value={formData.oldPhoneNumber}
          onChange={handleChange("oldPhoneNumber")}
          type="number"
        />
      </div> */}

      <div className="mt-8">
        <LabeledInput
          label="Enter Phone Number"
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

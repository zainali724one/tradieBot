import SettingTab from "../components/SettingTab";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/ui/BackButton";
import i1 from "../assets/icons/i1.png";
import i2 from "../assets/icons/i2.png";
import i3 from "../assets/icons/i3.png";
import { useNavigate } from "react-router-dom";
import { MdImage } from "react-icons/md";

const EditProfile = () => {
  const navigate = useNavigate();
  const tg = window?.Telegram?.WebApp;
    const telegramUserData = tg.initDataUnsafe.user;
  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Profile
        </h1>
      </header>

      <div className="flex flex-col items-center gap-4 mb-6  mt-4">
        <img
          src={telegramUserData?.photo_url}
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <SettingTab
          onClick={() => navigate("/editname")}
          title="Edit Name"
          icon={
            <img
              src={i1}
              alt="Edit Profile Icon"
              style={{ width: 20, height: 20 }}
            />
          }
        />
        <SettingTab
          onClick={() => navigate("/editemail")}
          title="Edit Email"
          icon={
            <img
              src={i3}
              alt="Edit Profile Icon"
              style={{ width: 18, height: 14 }}
            />
          }
        />
        <SettingTab
          onClick={() => navigate("/editphonenumber")}
          title="Edit Phone Number"
          icon={
            <img
              src={i2}
              alt="Edit Profile Icon"
              style={{ width: 18, height: 18 }}
            />
          }
        />
        <SettingTab
          onClick={() => navigate("/editlogo")}
          title="Edit Company Logo"
          icon={
            // <img
            //   src={i2}
            //   alt="Edit Profile Icon"
            //   style={{ width: 18, height: 18 }}
            // />
            <MdImage className="text-[17px] text-[#5290C1]"/>
          }
        />
      </div>

      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton children="Update" type="submit" />
      </div>
    </div>
  );
};

export default EditProfile;

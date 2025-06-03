import { useNavigate } from "react-router-dom";
import i1 from "../assets/icons/i1.png";
import i5 from "../assets/icons/i5.png";
import trash from "../assets/icons/trash.png";
import powerbutton from "../assets/icons/power-alt.png";
import clipboardtext from "../assets/icons/clipboard-text.png";
import SettingTab from "../components/SettingTab";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/ui/BackButton";

const Profile = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Profile
        </h1>
      </header>

      <div className="flex flex-col items-center gap-4  mt-4 mb-6">
        <img
          src="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <SettingTab
          onClick={() => navigate("/editProfile")}
          title="Edit Profile"
          icon={
            <img
              src={i1}
              alt="Edit Profile Icon"
              style={{ width: 20, height: 20 }}
            />
          }
        />

        <SettingTab
          title="Change Password"
          onClick={() => navigate("/changepassword")}
          icon={
            <img
              src={i5}
              alt="Edit Profile Icon"
              style={{ width: 16, height: 16 }}
            />
          }
        />
        <SettingTab
          onClick={() => navigate("/termsandcondition")}
          title="Terms & Conditions"
          icon={
            <img
              src={clipboardtext}
              alt="Edit Profile Icon"
              style={{ width: 20, height: 20 }}
            />
          }
        />

        <SettingTab
          onClick={() => navigate("#")}
          title="Delete Account"
          icon={
            <img
              src={trash}
              alt="Edit Profile Icon"
              style={{ width: 20, height: 20 }}
            />
          }
          showNextIcon={false}
        />

        <SettingTab
          onClick={() => navigate("#")}
          title="Logout"
          icon={
            <img
              src={powerbutton}
              alt="Edit Profile Icon"
              style={{ width: 20, height: 20 }}
            />
          }
          showNextIcon={false}
        />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton onClick={()=>navigate("/editProfile")} children="Connect with Stripe" />
      </div>
    </div>
  );
};

export default Profile;

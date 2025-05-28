import React from "react";

import i1 from "../assets/icons/i1.png";
import i5 from "../assets/icons/i5.png";
import trash from "../assets/icons/trash.png";
import powerbutton from "../assets/icons/power-alt.png";
import clipboardtext from "../assets/icons/clipboard-text.png";

import SettingTab from "../components/SettingTab"; // Make sure it's the reusable version
import PrimaryButton from "../components/PrimaryButton"; // Assuming you have this component
import BackButton from "../components/ui/BackButton";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate=useNavigate()
  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <div className="flex items-center gap-2 mb-4">
        <BackButton onClick={() => {}} />
      </div>

      <div className="flex flex-col items-center gap-4 mb-6 -mt-9">
        <h1 className="text-lg font-semibold ">Profile</h1>

        <img
          src="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <SettingTab
        onClick={() => navigate("/editprofile")}
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
                onClick={() => navigate("/editprofile")}

          title="Delete Account"
          icon={
            <img
              src={trash}
              alt="Edit Profile Icon"
              style={{ width: 20, height: 20 }}
            />
          }
        />

        <SettingTab
                onClick={() => navigate("/editprofile")}

          title="Logout"
          icon={
            <img
              src={powerbutton}
              alt="Edit Profile Icon"
              style={{ width: 20, height: 20 }}
            />
          }
        />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton children="Connect with Stripe" />
      </div>
    </div>
  );
};

export default Profile;

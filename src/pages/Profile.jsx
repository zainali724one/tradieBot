import React from "react";
import {
  LeftOutlined,
  UserOutlined,
  LockOutlined,
  FileTextOutlined,
  DeleteOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import SettingTab from "../components/SettingTab"; // Make sure it's the reusable version
import PrimaryButton from "../components/PrimaryButton"; // Assuming you have this component
import BackButton from "../components/ui/BackButton";

const Profile = () => {
  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <div className="flex items-center gap-2 mb-4">
        <BackButton onClick={() => {}} />
      </div>

      <div className="flex flex-col items-center gap-2 mb-6 -mt-9">
        <h1 className="text-lg font-semibold text-[#1976d2]">Profile</h1>

        <img
          src="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <SettingTab title="Edit Profile" icon={<UserOutlined />} />
        <SettingTab title="Change Password" icon={<LockOutlined />} />
        <SettingTab title="Terms & Conditions" icon={<FileTextOutlined />} />
        <SettingTab
          title="Delete Account"
          icon={<DeleteOutlined style={{ color: "#ff4d4f" }} />}
        />
        <SettingTab
          title="Logout"
          icon={<PoweroffOutlined style={{ color: "#ff4d4f" }} />}
          showNextIcon={false}
        />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton children="Connect with Stripe" />
      </div>
    </div>
  );
};

export default Profile;

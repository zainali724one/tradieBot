import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SettingTab from "../components/SettingTab";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/ui/BackButton";

const EditProfile = () => {
  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <div className="flex items-center gap-2 mb-4">
        <BackButton />
      </div>

      <div className="flex flex-col items-center gap-4 mb-6 -mt-9">
        <h1 className="text-lg font-semibold "> Edit Profile</h1>

        <img
          src="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
          alt="Profile"
          className="w-20 h-20 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-3">
        <SettingTab title="Edit Name" icon={<UserOutlined />} />
        <SettingTab title="Edit Email" icon={<LockOutlined />} />
        <SettingTab title="Edit Phone Number" icon={<LockOutlined />} />
      </div>

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton children="Update" />
      </div>
    </div>
  );
};

export default EditProfile;

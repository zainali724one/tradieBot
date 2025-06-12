import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDelete } from "../reactQuery/mutations/auth";

import clipboardtext from "../assets/icons/clipboard-text.png";
import CustomConfirmationModal from "../components/ui/CustomConfirmationModal";
import Logouticon from "../assets/icons/Featuredicon.svg";
import powerbutton from "../assets/icons/power-alt.png";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/ui/BackButton";
import SettingTab from "../components/SettingTab";
import trash from "../assets/icons/trash.png";
import i1 from "../assets/icons/i1.png";
import i5 from "../assets/icons/i5.png";

const Profile = () => {
  const navigate = useNavigate();
  // useDelete
  const { deleteUser, isLoading } = useDelete();
  const [userData, setUserData] = useState("1234455");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenforDelete, setIsModalOpenforDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancellingforDelete, setIsCancellingforDelete] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    const deleteaccount = {
      telegramId: userData,
    };
    deleteUser(deleteaccount, {
      onSuccess: (data) => {
        toast.success("Account deleted!");
        setIsDeleting(false);
        setIsModalOpenforDelete(false);
      },
      onError: (error) => {
        setIsDeleting(false);
        setIsModalOpenforDelete(false);
        toast.error(error?.response?.data?.message);
      },
    });
  };

  const LogoutIcon = () => (
    <div className="bg-red-100 rounded-full p-3">
      <img
        src={Logouticon}
        alt="Logout Icon"
        className="h-8 w-8 text-red-500"
      />
    </div>
  );

  const handleLogoutAccount = async () => {
    setLogout(true);
    // Simulate an API call or async operation
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    localStorage.removeItem("telegramid");
    navigate("/signin");
    setLogout(false);
    setIsModalOpen(false); // Close the modal after action
  };

  const DeleteIcon = () => (
    <div className="bg-red-100 rounded-full p-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </div>
  );

  const handleCancel = async () => {
    setIsCancelling(true);
    // Simulate a slight delay for visual feedback if needed
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsCancelling(false);
    setIsModalOpen(false);
  };

  const handleCancelforDelete = async () => {
    setIsCancellingforDelete(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsCancellingforDelete(false);
    setIsModalOpenforDelete(false);
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

        // setUserData(telegramData);
        setUserData("1234455");
      }
    };

    authenticatingUser();
  }, []);
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
          onClick={() => setIsModalOpenforDelete(true)}
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
          onClick={() => setIsModalOpen(true)}
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
        <PrimaryButton
          onClick={() => navigate("/editProfile")}
          children="Connect with Stripe"
        />
      </div>
      <CustomConfirmationModal
        isOpen={isModalOpenforDelete}
        title="Delete Account"
        message="Are you sure you want to delete your account?"
        onClose={handleCancelforDelete}
        icon={<DeleteIcon />}
        onConfirm={handleDeleteAccount}
        confirmButtonLoading={isDeleting}
        confirmButtonText="Delete"
        cancelButtonText="Cancle"
        confirmButtonLoadingText="Deleting..."
        cancelButtonLoading={isCancellingforDelete}
        cancelButtonLoadingText="Closing..."
      />

      <CustomConfirmationModal
        isOpen={isModalOpen}
        title="Logout"
        message="Are you sure you want to Logout your account?"
        onClose={handleCancel}
        icon={<LogoutIcon />}
        onConfirm={handleLogoutAccount}
        confirmButtonLoading={isLogout}
        confirmButtonText="Logout"
        cancelButtonText="Cancle"
        confirmButtonLoadingText="Logout..."
        cancelButtonLoading={isCancelling}
        cancelButtonLoadingText="Closing..."
      />
    </div>
  );
};

export default Profile;

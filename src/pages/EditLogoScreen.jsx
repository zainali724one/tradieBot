import { useEffect, useState } from "react";
import { useEditProfile } from "../reactQuery/mutations/auth";
import PrimaryButton from "../components/PrimaryButton";
import BackButton from "../components/ui/BackButton";
import { useSelector } from "react-redux";
import { Getuser } from "../api/auth/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// import defaultLogo from "../assets/default-company-logo.png";
import { storage } from "../../firebase";

function EditLogoScreen() {
  const { editProfile, isLoading } = useEditProfile();
  const userId = useSelector((state) => state.session.userId);

  const [formData, setFormData] = useState({
    logo: null,
    logoPreview: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  const returnUserData = async (telegramId) => {
    Getuser(telegramId)
      .then((res) => {
        setFormData((prevData) => ({
          ...prevData,
          logoPreview: res?.user?.companyLogo || "",
        }));
        console.log(res, "data is added");
      })
      .catch((err) => {
        console.log(err, "here is the error");
      });
  };

  const tg = window?.Telegram?.WebApp;
  tg?.ready();
  
  useEffect(() => {
    if (tg?.initDataUnsafe?.user?.id) {
      const userId = tg.initDataUnsafe.user.id;
      returnUserData(userId);
    }
  }, [tg?.initDataUnsafe?.user?.id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({
        logo: file,
        logoPreview: previewUrl,
      });
    }
  };

  const uploadLogoToFirebase = async (file) => {
    if (!file) return null;
    
    try {
      setIsUploading(true);
      const storageRef = ref(storage, `companyLogos/${userId.telegramId}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading logo:", error);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async () => {
    let logoUrl = formData.logoPreview;
    
    // If a new logo was selected, upload it first
    if (formData.logo) {
      logoUrl = await uploadLogoToFirebase(formData.logo);
      if (!logoUrl) return; // Upload failed
    }

    const editLogoData = {
      type: "logo",
      id: userId?.telegramId,
      companyLogo: logoUrl,
    };
    
    editProfile(editLogoData);
  };

  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5] pt-12 px-5 max-w-[430px]">
      <header className="flex items-center">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Company Logo
        </h1>
      </header>

      <div className="mt-8 flex flex-col items-center">
        {/* Logo Preview */}
        <div className="mb-6 w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-gray-300">
          <img 
            src={formData.logoPreview || "https://placehold.co/128x128"} 
            alt="Company Logo" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* File Input */}
        <label className="w-full">
          <div className="bg-white rounded-lg p-4 text-center cursor-pointer border border-dashed border-gray-400 hover:bg-gray-50">
            <span className="text-blue-600 font-medium">
              {formData.logo ? "Change Logo" : "Select Logo"}
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          {formData.logo && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              {formData.logo.name}
            </p>
          )}
        </label>
      </div>

      <div className="fixed bottom-[100px] left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
        <PrimaryButton
          disabled={isLoading || isUploading}
          loading={isLoading || isUploading}
          loadingText="Uploading..."
          onClick={handleUpdate}
          color="blue"
          children="Update Logo"
        />
      </div>
    </div>
  );
}

export default EditLogoScreen;
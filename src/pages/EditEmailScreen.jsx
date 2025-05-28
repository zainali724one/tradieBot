import { useState } from "react";
import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";
import i3 from "../assets/icons/i3.png";
import BackButton from "../components/ui/BackButton";

function EditEmailScreen() {
  const [formData, setFormData] = useState({
    oldEmail: "xya@gmail.com", // Example old email
    newEmail: "", // New email will be entered by user
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Update Email data:", formData);
    // Here you would typically send the data to a backend
    alert("Email updated (check console for data)");
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-[#D3DCE5]">
      {/* System Status Bar */}

      {/* Header */}
      <header className="flex items-center p-4 pt-10 ">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Email
        </h1>
      </header>

      {/* Form Fields */}
      <form onSubmit={handleUpdate} className="px-4 mt-8">
        <div>
          {" "}
          <LabeledInput
            label="Old Email"
            id="oldEmail"
            placeholder="Enter your email"
            prefix={<img src={i3} className="h-[14px] w-[18px]" />}
            value={formData.oldEmail}
            onChange={handleChange}
            //   icon={FaEnvelope} // Add email icon
            type="email"
          />
        </div>

        <div className="mt-4">
          <LabeledInput
            label="New Email"
            id="newEmail"
            prefix={<img src={i3} className="h-[14px] w-[18px]" />}
            placeholder="Enter your email"
            value={formData.newEmail}
            onChange={handleChange}
            //   icon={FaEnvelope} // Add email icon
            type="email"
          />
        </div>

        {/* Update Button */}
        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <PrimaryButton children="Update" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default EditEmailScreen;

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
    // alert("Email updated (check console for data)");
  };

  return (
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center  ">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Email
        </h1>
      </header>

      <form onSubmit={handleUpdate} className="mt-8">
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

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
          <PrimaryButton children="Update" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default EditEmailScreen;

import React, { useState } from "react";
// import { FaArrowLeft, FaPhoneAlt } from 'react-icons/fa'; // Import icons
// import InputGroup from '../components/InputGroup'; // Re-use InputGroup
import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";
import i2 from "../assets/icons/i2.png";
import BackButton from "../components/ui/BackButton";

function EditPhoneNumberScreen() {
  const [formData, setFormData] = useState({
    oldPhoneNumber: "123-456-7890", // Example old phone number
    newPhoneNumber: "", // New phone number will be entered by user
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
    console.log("Update Phone Number data:", formData);
    // Here you would typically send the data to a backend
    alert("Phone Number updated (check console for data)");
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-[#D3DCE5]">
      <header className="flex items-center p-4 pt-10 ">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Phone Number
        </h1>
      </header>

      <form onSubmit={handleUpdate} className="px-4 mt-8">
        <div>
          <LabeledInput
            label="Old Phone Number"
            prefix={<img src={i2} className="h-[18px] w-[18px]" />}
            id="oldPhoneNumber"
            placeholder="Enter your old phone number"
            value={formData.oldPhoneNumber}
            onChange={handleChange}
            //   icon={FaPhoneAlt} // Add phone icon
            type="tel" // Use 'tel' type for phone numbers
          />
        </div>

        <div className="mt-4">
          <LabeledInput
            label="New Phone Number"
            id="newPhoneNumber"
            prefix={<img src={i2} className="h-[18px] w-[18px]" />}
            placeholder="Enter your new phone number"
            value={formData.newPhoneNumber}
            onChange={handleChange}
            //   icon={FaPhoneAlt} // Add phone icon
            type="tel" // Use 'tel' type for phone numbers
          />
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <PrimaryButton type="submit" children={"Update"} />
        </div>
      </form>
    </div>
  );
}

export default EditPhoneNumberScreen;

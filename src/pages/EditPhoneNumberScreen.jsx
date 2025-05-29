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
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center">
        <BackButton />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Phone Number
        </h1>
      </header>

      <form onSubmit={handleUpdate} className="mt-8">
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

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
          <PrimaryButton type="submit" children={"Update"} />
        </div>
      </form>
    </div>
  );
}

export default EditPhoneNumberScreen;

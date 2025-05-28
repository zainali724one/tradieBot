import React, { useState } from 'react';
// import { FaArrowLeft, FaPhoneAlt } from 'react-icons/fa'; // Import icons
// import InputGroup from '../components/InputGroup'; // Re-use InputGroup
import LabeledInput from '../components/LabeledInput';
import PrimaryButton from '../components/PrimaryButton';
import i2 from "../assets/icons/i2.png";
import arrowback from "../assets/icons/arrow_back.png";
import BackButton from '../components/ui/BackButton';



function EditPhoneNumberScreen() {
  const [formData, setFormData] = useState({
    oldPhoneNumber: '123-456-7890', // Example old phone number
    newPhoneNumber: '', // New phone number will be entered by user
  });

  const handleBack = () => {
    // Implement navigation back functionality (e.g., using react-router-dom history.goBack())
    console.log('Go back from Edit Phone Number');
    alert('Back button clicked on Edit Phone Number!');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('Update Phone Number data:', formData);
    // Here you would typically send the data to a backend
    alert('Phone Number updated (check console for data)');
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-[#D3DCE5]">
      {/* System Status Bar */}
  

      {/* Header */}
      <header className="flex items-center p-4 pt-10 ">
      <BackButton onClick={handleBack} />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">Edit Phone Number</h1>
      </header>

      {/* Form Fields */}
      <form onSubmit={handleUpdate} className="px-4 mt-8">
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

        {/* Update Button */}
        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
         <PrimaryButton
           className="w-full bg-[#5290C1] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
         >
           Update
         </PrimaryButton>
       </div>
      </form>
    </div>
  );
}

export default EditPhoneNumberScreen;

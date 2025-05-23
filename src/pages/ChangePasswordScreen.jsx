import React, { useState } from 'react';
// import { FaArrowLeft } from 'react-icons/fa';
// import PasswordInputGroup from '../components/PasswordInputGroup'; // Use the new password input component
import LabeledInput from '../components/LabeledInput';
import PrimaryButton from '../components/PrimaryButton';
import i5 from "../assets/icons/i5.png";
import arrowback from "../assets/icons/arrow_back.png";
import BackButton from '../components/ui/BackButton';



function ChangePasswordScreen() {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleBack = () => {
    // Implement navigation back functionality (e.g., using react-router-dom history.goBack())
    console.log('Go back from Change Password');
    alert('Back button clicked on Change Password!');
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
    // Basic validation example
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New password and confirm password do not match!');
      return;
    }
    if (!formData.oldPassword || !formData.newPassword || !formData.confirmPassword) {
        alert('All fields are required!');
        return;
    }
    console.log('Update Password data:', formData);
    // Here you would typically send the data to a backend for password update
    alert('Password updated (check console for data)');
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-[#D3DCE5]">
      {/* System Status Bar */}
  

      {/* Header */}
      <header className="flex items-center p-4 pt-10">
      <BackButton onClick={handleBack} />
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">Change Password</h1>
      </header>

      {/* Form Fields */}
      <form onSubmit={handleUpdate} className="px-4 mt-8">
        <LabeledInput
          label="Old Password"
          id="oldPassword"
                      prefix={<img src={i5} className="h-[18px] w-[16px]" />}
          
          placeholder="Enter your old password"
          value={formData.oldPassword}
          onChange={handleChange}
        />

        <LabeledInput
          label="New Password"
          id="newPassword"
                      prefix={<img src={i5} className="h-[18px] w-[16px]" />}
          
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <LabeledInput
          label="Confirm Password"
          id="confirmPassword"
                      prefix={<img src={i5} className="h-[18px] w-[16px]" />}
          
          placeholder="Enter your confirm password"
          value={formData.confirmPassword}
          onChange={handleChange}
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

export default ChangePasswordScreen;
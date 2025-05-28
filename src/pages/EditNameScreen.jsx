import React, { useState } from "react";

import LabeledInput from "../components/LabeledInput"; 
import PrimaryButton from "../components/PrimaryButton";
import i1 from "../assets/icons/i1.png";
// import arrowback from "../assets/icons/arrow_back.png";
import BackButton from "../components/ui/BackButton";

function EditNameScreen() {
  const [formData, setFormData] = useState({
    oldName: "Lorem Steve", 
    newName: "", 
  });

  const handleBack = () => {
    console.log("Go back from Edit Name");
    alert("Back button clicked on Edit Name!");
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
    console.log("Update Name data:", formData);
    alert("Name updated (check console for data)");
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-[#D3DCE5]">
    

      <header className="flex items-center p-4 pt-10 ">
        {/* <button onClick={handleBack}>
          <img src={arrowback} alt="Back" className="w-5 h-5" />
        </button> */}

<BackButton onClick={handleBack} />

        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Name
        </h1>
      </header>

      <form onSubmit={handleUpdate} className="px-4 mt-8">
        <LabeledInput
          label="Old Name"
          id="oldName"
          prefix={<img src={i1} className="h-[18px] w-[18px]" />}
          placeholder="Enter your name"
          value={formData.oldName}
          onChange={handleChange}
          type="text" 
        />

        <LabeledInput
          label="New Name"
          id="newName"
          placeholder="Enter your name"
          prefix={<img src={i1} className="h-[18px] w-[18px]" />}
          value={formData.newName}
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

export default EditNameScreen;

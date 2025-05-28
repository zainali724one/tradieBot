import { useState } from "react";

import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";
import i1 from "../assets/icons/i1.png";
import BackButton from "../components/ui/BackButton";

function EditNameScreen() {
  const [formData, setFormData] = useState({
    oldName: "Lorem Steve",
    newName: "",
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
    console.log("Update Name data:", formData);
    alert("Name updated (check console for data)");
  };

  return (
    <div className="w-full max-w-md h-[100dvh] bg-[#D3DCE5]">
      <header className="flex items-center p-4 pt-10 ">
        <BackButton />

        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Name
        </h1>
      </header>

      <form onSubmit={handleUpdate} className="px-4 mt-8">
        <div>
          <LabeledInput
            label="Old Name"
            id="oldName"
            prefix={<img src={i1} className="h-[18px] w-[18px]" />}
            placeholder="Enter your name"
            value={formData.oldName}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="mt-4">
          <LabeledInput
            label="New Name"
            id="newName"
            placeholder="Enter your name"
            prefix={<img src={i1} className="h-[18px] w-[18px]" />}
            value={formData.newName}
            onChange={handleChange}
          />
        </div>

        <div className="fixed bottom-0 left-0 w-full px-4 pb-4 z-10">
          <PrimaryButton>Update</PrimaryButton>
        </div>
      </form>
    </div>
  );
}

export default EditNameScreen;

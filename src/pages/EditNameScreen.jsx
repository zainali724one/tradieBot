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
    <div className="p-4 h-[100dvh] relative bg-[#D3DCE5]  pt-12 px-5  max-w-[430px]">
      <header className="flex items-center ">
        <BackButton />

        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Edit Name
        </h1>
      </header>

      <form onSubmit={handleUpdate} className="mt-8">
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

        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-5">
          <PrimaryButton children="Update" />
        </div>
      </form>
    </div>
  );
}

export default EditNameScreen;

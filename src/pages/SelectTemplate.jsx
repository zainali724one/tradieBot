import React, { useEffect, useState } from "react";
import temp1 from "../assets/temp1.PNG";
import temp2 from "../assets/tmp2.PNG";
import { useEditProfile } from "../reactQuery/mutations/auth";
import { Getuser } from "../api/auth/auth";
import { useSelector } from "react-redux";

const templates = [
  { id: "1", name: "Template 1", image: temp1 },
  { id: "2", name: "Template 2", image: temp2 },
];

const SelectTemplate = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [userData, setUserData] = useState({});
  console.log(userData, "userData");
  const { editProfile, isLoading } = useEditProfile();
  const userId = useSelector((state) => state.session.userId);

  const handleUpdate = () => {
    const editprofiledata = {
      type: "template",
      id: userId?.telegramId,
      pdfTemplateId: selectedTemplate,
    };
    editProfile(editprofiledata);
  };

  const returnUserData = async (telegramId) => {
    // 8141119319

    Getuser(telegramId)
      .then((res) => {
        setUserData(res?.user);
        setSelectedTemplate(res?.user?.pdfTemplateId || "1");
        console.log(res, "data is added");
      })
      .catch((err) => {
        // localStorage.removeItem("telegramid");
        // nevigate("/signin");
        console.log(err, "here is the error");
      });
    // return theUser;
  };
  const tg = window?.Telegram?.WebApp;
  console.log(tg.initDataUnsafe.user, "here is user");
  // const telegramUserData = tg.initDataUnsafe.user;

  tg?.ready();
  useEffect(() => {
    if (tg?.initDataUnsafe?.user?.id) {
      const userId = tg.initDataUnsafe.user.id;
      returnUserData(userId);
    }
  }, [tg?.initDataUnsafe?.user?.id]);

  return (
    <div className="max-w-[430px]  mx-auto  bg-[#D3DCE5]  min-h-screen h-[100%] overflow-y-scroll relative pt-4">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800 ">
        Choose a Template
      </h2>

      <div className="gap-4 w-[100%] flex justify-evenly items-center">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border-2 rounded-lg w-[40%] overflow-hidden cursor-pointer transition-all duration-200 ${
              selectedTemplate === template.id
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-gray-200"
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full object-cover"
            />
            <div className="p-2 text-center text-[#5290C1] font-medium">
              {template.name}
            </div>
          </div>
        ))}
      </div>

      <div className="w-[100%] flex justify-center">
        <button
          className="mt-6 w-[90%] bg-[#5290C1] text-white py-3 rounded-md text-lg font-semibold transition absolute bottom-[100px]"
          onClick={handleUpdate}
          disabled={selectedTemplate === null}
        >
          {isLoading ? "Updating..." : "Select Template"}
        </button>
      </div>
    </div>
  );
};

export default SelectTemplate;

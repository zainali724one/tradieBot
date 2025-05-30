import { useState } from "react";
import PrimaryButton from "../components/PrimaryButton";
import { useNavigate } from "react-router-dom";
import UserProfileHeader from "../components/UserProfileHeader";

const Chase = () => {
  const [selectedOption, setSelectedOption] = useState("quote");
  const navigate = useNavigate();

  const chaseOptions = [
    { id: "quote", label: "Quote" },
    { id: "invoice", label: "Invoice" },
  ];

  return (
    <div className="flex flex-col items-center h-[100dvh] bg-[#D3DCE5] pt-12 px-6 " >
      <UserProfileHeader
      style={{border:"2px solid blue"}}
        image="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
        name="Mr. Thomas John"
        subtitle="Welcome"
      />

      <div className="mt-4 w-full ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Chase
        </h2>
        <p className="text-sm text-[#1B1C1E] font-medium font-poppins mt-4">
          What would you like to chase?
        </p>

        <div className="mt-4 space-y-4">
          {chaseOptions.map((option) => (
            <div key={option.id}>
              <div
                onClick={() => setSelectedOption(option.id)}
                className="flex items-center gap-3 cursor-pointer"
              >
                {selectedOption === option.id ? (
                  <div className="w-5 h-5 rounded-full bg-[#5290C1] flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-400 rounded-full" />
                )}

                <label className="text-sm font-medium text-[#1B1C1E] font-poppins">
                  {option.label}
                </label>
              </div>
              <div className="w-full h-px bg-gray-400 mt-2" />
            </div>
          ))}
        </div>

   
      </div>

      <div className=" mt-2 flex  w-[90%] fixed bottom-20">
                <PrimaryButton  children="Continue" />
              </div>
      {/* <div className="absolute bottom-23 w-full px-10 ">
        <PrimaryButton
          type="button"
          children="Continue"
          onClick={() => navigate(`/chases/${selectedOption}`)}
        />
      </div> */}

      
    </div>
  );
};

export default Chase;

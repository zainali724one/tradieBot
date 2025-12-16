import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleOpenExternalLink } from "../services";
import axios from "axios";
import temp1 from "../assets/temp1.PNG";
import temp2 from "../assets/tmp2.PNG";
import { useEditProfile } from "../reactQuery/mutations/auth";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <svg
    className="w-10 h-10"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#4285F4"
      d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.09 5.12-4.25 6.72v5.59h7.19c4.21-3.87 6.68-9.48 6.68-16.32z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.49 0 11.92-2.13 15.89-5.81l-7.19-5.59c-2.16 1.45-4.92 2.3-8.7 2.3-6.69 0-12.36-4.5-14.4-10.51H2.35v5.81C6.31 44.63 14.59 48 24 48z"
    />
    <path
      fill="#FBBC05"
      d="M9.6 28.99c-.38-1.13-.6-2.31-.6-3.49s.22-2.36.6-3.49V16.2H2.35C1.19 18.66.5 21.28.5 24s.69 5.34 1.85 7.79l7.25-5.8z"
    />
    <path
      fill="#EA4335"
      d="M24 9.49c3.54 0 6.7 1.22 9.23 3.6l6.36-6.36C35.9 2.81 30.47 0 24 0 14.59 0 6.31 5.37 2.35 12.39l7.25 5.81C11.64 13.99 17.31 9.49 24 9.49z"
    />
  </svg>
);

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [authUrl, setAuthUrl] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const res = await axios.post(
          `https://tradie-bot-backend-three.vercel.app/api/xero/consentUrl`,
          {
            userId: userId?._id,
          }
        );
        setAuthUrl(res.data.url);
      } catch (error) {
        console.log("Error fetching Xero auth URL:", error);
      }
    };
    fetchAuthUrl();
  }, []);
  const userId = useSelector((state) => state.session.userId);

  const handleConnectStripe = () => {
    const clientId = "ca_SyqoD4zwYXEG5GXruZBjMcZJ85VDVEbA";
    const redirectUri = encodeURIComponent(
      "https://tradie-bot-backend-three.vercel.app/api/stripe/oauth/callback"
    );

    const stripeConnectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&redirect_uri=${redirectUri}&state=${userId?._id}`;

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(stripeConnectUrl, {
        try_instant_view: false,
      });
    } else {
      window.location.href = stripeConnectUrl;
    }
  };

  const handleConnectGoogle = () => {
    const redirectUrl = `https://tradie-bot-backend-three.vercel.app/api/user/connect/${userId?._id}`;
    handleOpenExternalLink(redirectUrl);
    // window.open(redirectUrl, "_blank");
  };

  // --- State for Step 1 ---
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState("template1"); // 'template1' or 'template2'

  // const handleLogoUpload = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setSelectedLogo(event.target.files[0]);
  //     console.log("Logo selected:", event.target.files[0].name);
  //   }
  // };

  const handleNextStep = () => {
    setStep(2);
  };

  const handleConnect = (service) => {
    console.log(`Connecting to ${service}...`);
    if (service === "stripe") {
      handleConnectStripe();
    } else if (service === "google") {
      handleConnectGoogle();
    } else if (service === "xero" && authUrl) {
      handleOpenExternalLink(authUrl);
    }
  };

  const { editProfile, isLoading: isEditingProfile } = useEditProfile();

  const [isUploading, setIsUploading] = useState(false);

  // --- Firebase Upload Function ---
  const uploadLogoToFirebase = async (file) => {
    if (!file || !userId?.telegramId) return null;

    try {
      setIsUploading(true);
      const storageRef = ref(
        storage,
        `companyLogos/${userId.telegramId}/${file.name}`
      );
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast.error("Logo upload failed. Please try again.");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogoUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedLogo(file); // Store the actual file
      console.log("Logo selected:", file.name);
    }
  };

  const handleFinish = async () => {
    let logoUrl = null;

    // 1. Upload Logo if it exists
    if (selectedLogo) {
      logoUrl = await uploadLogoToFirebase(selectedLogo);
      if (!logoUrl) return; 
    }
    const onboardingData = {
      type: "onboarding",
      id: userId?.telegramId,
      companyLogo: logoUrl, 
      pdfTemplateId: selectedTemplate,
    };

    // 3. Call the mutation
    editProfile(onboardingData, {
      onSuccess: () => {
        setStep(2);
      },
      onError: (error) => {
        console.error("Failed to finish setup:", error);
        toast.error("Failed to save settings. Please try again.");
      },
    });
  };

  const handleSkip = () => {
    console.log("Skipping for now...");
    navigate("/quoteform");
   
  };

  // Combine loading states
  const isLoading = isUploading || isEditingProfile;

  return (
    <div className="min-h-screen w-full bg-[#D3DCE5] text-black p-6 flex flex-col">
      {step === 1 && (
        <Step1
          selectedLogo={selectedLogo}
          selectedTemplate={selectedTemplate}
          onLogoUpload={handleLogoUpload}
          onTemplateSelect={setSelectedTemplate}
          onNext={handleNextStep}
          onSave={handleFinish}
          isSaving={isLoading}
        />
      )}

      {step === 2 && (
        <Step2
          onConnect={handleConnect}
          onFinish={handleSkip}
          onSkip={handleSkip}
        />
      )}
    </div>
  );
}

function Step1({
  selectedLogo,
  // selectedTemplate,
  onLogoUpload,
  // onTemplateSelect,
  onNext,
  onSave,
  isSaving,
}) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    { id: "1", name: "Template 1", image: temp1 },
    { id: "2", name: "Template 2", image: temp2 },
  ];

  return (
    <div className="flex flex-col flex-grow h-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome!</h1>
        <p className="text-lg text-gray-800">
          Let's set up your business profile.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {/* 1. Logo Upload */}
        <div className="mb-8">
          <label className="text-lg font-semibold mb-3 block">
            1. Upload Your Company Logo
          </label>
          <label
            htmlFor="logo-upload"
            className="w-full bg-white rounded-lg p-4 flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-400 hover:border-[#5290C1]"
          >
            <input
              id="logo-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={onLogoUpload}
            />
            {/* Upload Icon */}
            <svg
              className="w-8 h-8 text-gray-500 mr-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 16v5a2 2 0 01-2 2H10a2 2 0 01-2-2v-5m12-4l-4-4-4 4m0 0l-4-4 4-4m4 4v12"
              />
            </svg>
            <span className="text-gray-700">
              {selectedLogo ? selectedLogo.name : "Click to upload logo"}
            </span>
          </label>
        </div>

        {/* 2. Template Selection */}
        <div>
          <label className="text-lg font-semibold mb-3 block">
            2. Select a Template
          </label>
          {/* <div className="grid grid-cols-2 gap-4">
          
            <TemplateCard
              name="Modern"
              isSelected={selectedTemplate === "template1"}
              onClick={() => onTemplateSelect("template1")}
            />
          
            <TemplateCard
              name="Classic"
              isSelected={selectedTemplate === "template2"}
              onClick={() => onTemplateSelect("template2")}
            />
          </div> */}

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
        </div>
      </div>

      {/* Footer Button */}

      <div className="mt-10">
        <button
          onClick={onSave}
          className="w-full bg-[#5290C1] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-opacity-90 transition-colors"
        >
          {isSaving ? "Saving..." : "Save & Continue"}
        </button>
      </div>

      <div className="mt-10">
        {/* <button
          onClick={onNext}
          className="w-full bg-[#5290C1] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-opacity-90 transition-colors"
        >
          Next
        </button> */}

        <button
          onClick={onNext}
          className="w-full text-[#5290C1] py-3 rounded-lg text-lg font-semibold"
        >
          {}
          Skip for now
        </button>
      </div>
    </div>
  );
}

function Step2({ onConnect, onFinish, onSkip }) {
  return (
    <div className="flex flex-col flex-grow h-full">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Connect Your Tools</h1>
        <p className="text-lg text-gray-800">
          Automate your workflow to save time.
        </p>
      </div>

      {/* Main Content: Connection Buttons */}
      <div className="flex-grow space-y-4">
        {/* Stripe */}
        <ConnectButton
          serviceName="Stripe"
          description="To get paid directly from quotes"
          onClick={() => onConnect("stripe")}
          icon={<StripeIcon />}
        />

        {/* Google */}
        <ConnectButton
          serviceName="Google"
          description="Save to Drive & sync your calendar"
          onClick={() => onConnect("google")}
          icon={<GoogleIcon />}
        />

        {/* Xero */}
        <ConnectButton
          serviceName="Xero"
          description="Automatically sync your accounting"
          onClick={() => onConnect("xero")}
          icon={<XeroIcon />}
        />
      </div>

      {/* Footer Buttons */}
      <div className="mt-10 space-y-3">
        <button
          onClick={onFinish}
          className="w-full bg-[#5290C1] text-white py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-opacity-90 transition-colors"
        >
          Finish Setup
        </button>
        <button
          onClick={onSkip}
          className="w-full text-[#5290C1] py-3 rounded-lg text-lg font-semibold"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

// A card for selecting a template
function TemplateCard({ name, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`border-4 bg-white rounded-lg p-4 cursor-pointer transition-all ${
        isSelected
          ? "border-[#5290C1]"
          : "border-transparent hover:border-gray-300"
      }`}
    >
      {/* Simple visual preview */}
      <div className="h-24 bg-gray-200 rounded flex flex-col p-2">
        <div className="w-1/3 h-3 bg-gray-400 rounded mb-2"></div>
        <div className="w-full h-2 bg-gray-300 rounded mb-1"></div>
        <div className="w-3/4 h-2 bg-gray-300 rounded mb-1"></div>
        <div className="w-1/2 h-2 bg-gray-300 rounded"></div>
      </div>
      <p className="text-center font-semibold mt-2">{name}</p>
    </div>
  );
}

// A button for connecting a service
function ConnectButton({ serviceName, description, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white p-4 rounded-lg shadow flex items-center space-x-4 text-left hover:bg-gray-50 transition-colors"
    >
      <div className="flex-shrink-0 w-10 h-10">{icon}</div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-black">{serviceName}</h3>
        <p className="text-sm text-gray-700">{description}</p>
      </div>
      {/* Chevron Right Icon */}
      <svg
        className="w-5 h-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}

// --- SVG Icons (Simplified) ---
// You can replace these with more detailed SVGs or <img> tags if you prefer

const StripeIcon = () => (
  <svg
    className="w-10 h-10"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#6772E5"
      d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0z"
    />
    <path fill="#FFF" d="M11.5 17.1h15.8v3.4H11.5zM20.2 27.5h15.8v3.4H20.2z" />
    <path fill="#FFF" d="M11.5 22.3h15.8v3.4H11.5zM20.2 32.7h15.8v3.4H20.2z" />
  </svg>
);

const XeroIcon = () => (
  <svg
    className="w-10 h-10"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#1BB5E9"
      d="M24 0C10.7 0 0 10.7 0 24s10.7 24 24 24 24-10.7 24-24S37.3 0 24 0z"
    />
    <path
      fill="#FFF"
      d="M29.2 14.3l-5.3 7.8 5.3 7.8h-4.2l-3.2-4.9-3.2 4.9h-4.2l5.3-7.8-5.3-7.8h4.2l3.2 4.9 3.2-4.9h4.2z"
    />
  </svg>
);

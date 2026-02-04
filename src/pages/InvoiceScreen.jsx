import React, { useEffect, useRef, useState } from "react";

import UserProfileHeader from "../components/UserProfileHeader";
import { useAddInvoice } from "../reactQuery/mutations/auth";
import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import TextArea from "../components/ui/TextArea";
import Selector from "../components/selector";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Getuser, uploadPdf } from "../api/auth/auth";
import StripeConnectModal from "../components/StripeConnectModal";
import TemplateTwo from "./TemplateTwo";
import TemplateOne from "./TemplateOne";
import { handleGeneratePdf } from "../services";
import AddressSelector from "../components/AddressSelector";
import AddressFinderModal from "../components/AddressFinderModal";
import Text from "../components/ui/Text";

function InvoiceScreen() {
  const { AddInvoice, isLoading } = useAddInvoice();
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const userId = useSelector((state) => state.session.userId);
  const [formErrors, setFormErrors] = useState({});
  const [crntUser, setCrntUser] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [telegramUserData, setTelegramUserData] = useState({});
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    jobDescription: "",
    InvoiceAmount: "",
    CustomerEmail: "",
    includeCost: "",
    includeReceipt: "",
    sheetId: "",
    address: "",
    customerPhone: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const returnUserData = async (telegramId) => {
    // 8141119319

    Getuser(telegramId)
      .then((res) => {
        if (res?.user.isApproved !== "Accepted") {
                localStorage.removeItem("telegramid");
                nevigate("/signin");
        }
        setCrntUser(res?.user);
        setFormData((prevData) => ({
          ...prevData,
          sheetId: res?.user?.sheetId || "",
        }));
        console.log(res, "data is added");
      })
      .catch((err) => {
        console.log(err, "here is the error");
      });
    // return theUser;
  };

  useEffect(() => {
    const tg = window?.Telegram?.WebApp;
    tg?.ready();
    if (tg) {
      if (tg?.initDataUnsafe?.user?.id) {
        const userId = tg.initDataUnsafe.user.id;
        setTelegramUserData(tg.initDataUnsafe.user);
        returnUserData(userId);
      }
    }
  }, []);

  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.CustomerEmail.trim()) {
      errors.CustomerEmail = "Email is required";
    } else if (formData.CustomerEmail.length < 6) {
      errors.CustomerEmail = "Email must be at least 6 characters";
    } else if (!emailRegex.test(formData.CustomerEmail)) {
      errors.CustomerEmail = "Invalid email format";
    }

    if (!formData.jobDescription.trim()) {
      errors.jobDescription = "Job Description is required";
    }

    if (!formData.customerName.trim()) {
      errors.customerName = "Name  is required";
    }

    if (!formData.InvoiceAmount.trim()) {
      errors.InvoiceAmount = "Invoice Amount is required";
    }

    if (!formData.includeCost.trim()) {
      errors.includeCost = "Include Cost is required";
    }

    if (!formData.includeReceipt.trim()) {
      errors.includeReceipt = "Include Receipt is required";
    }

    if (!formData.sheetId.trim()) {
      errors.includeReceipt = "Google sheet id is required";
    }

    if (!formData.customerPhone.trim()) {
      errors.includeReceipt = "Phone number is required";
    }


     if (!formData.jobId.trim()) {
      errors.jobId = "Job ID is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("All fields are required");
      return;
    }
    // if (
    //   !crntUser?.stripeAccountId ||
    //   !crntUser?.googleRefreshToken ||
    //   !crntUser?.googleAccessToken
    // ) {
    //   setModalOpen(true);
    //   return;
    // }
    const Addinvoice = {
      userId: userId._id,
      telegramId: userId?.telegramId,
      customerName: formData?.customerName,
      invoiceAmount: formData?.InvoiceAmount,
      address: formData?.address,
      jobDescription: formData?.jobDescription,
      customerEmail: formData?.CustomerEmail,
      includeCost: formData.includeCost,
      includeReceipt: formData.includeReceipt,
      customerPhone: formData.customerPhone,
      sheetId: formData.sheetId,
      jobId: formData.jobId,
    };

    AddInvoice(Addinvoice, {
      onSuccess: (res) => {
        setResponseData(res.data);
        setFormData({
          customerName: "",
          jobDescription: "",
          InvoiceAmount: "",
          CustomerEmail: "",
          includeCost: "",
          includeReceipt: "",
          customerPhone: "",
          address: "",
          jobId: "",
        });
      },
      onError: (error) => {
        console.error("Error adding invoice:", error);
        toast.error("Failed to add invoice. Please try again.");
      },
    });
  };

  // const telegramUserData = tg.initDataUnsafe.user;
  //  const telegramUserData ={}

  const pdfRef = useRef(null);

  useEffect(() => {
    if (responseData) {
      setTimeout(async () => {
        try {
          const pdfBlob = await handleGeneratePdf(
            pdfRef,
            { ...responseData, type: "quote" },
            crntUser?.pdfTemplateId
          );
          const formData = new FormData();
          formData.append("file", pdfBlob, "invoice.pdf");
          formData.append("telegramId", responseData?.telegramId);
          formData.append("pdfType", "invoice");
          formData.append("customerEmail", responseData?.customerEmail);
          formData.append("customerName", responseData?.customerName);
          formData.append("customerPhone", responseData?.customerPhone);
          formData.append("amount", responseData?.amount);
           formData.append("paymentUrl", responseData?.paymentUrl);

          await uploadPdf(formData);
        } catch (error) {
          console.error("Failed to generate or upload PDF:", error);
        }
      }, 500);
    }
  }, [responseData]);

  const handleAddressSelected = (fullAddress) => {
    setFormData((prev) => ({
      ...prev,
      address: fullAddress, // Update the form data
    }));
    setFormErrors((prev) => ({
      ...prev,
      address: "", // Clear any errors for this field
    }));
    setIsAddressModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-9 px-6 pb-20 overflow-y-auto ">
      <UserProfileHeader
        image={telegramUserData?.photo_url}
        name={telegramUserData?.first_name + " " + telegramUserData?.last_name}
        subtitle="Welcome"
      />

      <div className="mt-4 w-full max-h-[70dvh] overflow-y-auto ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Invoice
        </h2>
        <LabeledInput
          label="Customer Name"
          id="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          error={formErrors.customerName}
          // onChange={handleChange}
          onChange={handleChange("customerName")}
        />
        <div className="mt-3">
          <p className="font-[500] text-[14px]">Job Description</p>
          <TextArea
            label="Job Description"
            placeholder="Enter job description"
            value={formData.jobDescription}
            error={formErrors.jobDescription}
            onChange={handleChange("jobDescription")}
            className="w-[100%] min-h-[140px] outline-none rounded-[10px] p-3"
            style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
          />
        </div>

        <div className="mt-3">
          <LabeledInput
            label="Invoice Amount"
            type="number"
            placeholder="£ 0.00"
            value={formData.InvoiceAmount}
            error={formErrors.InvoiceAmount}
            onChange={handleChange("InvoiceAmount")}
          />
        </div>

        <div className="mt-3">
          <LabeledInput
            label="Customer Email"
            type="CustomerEmail"
            placeholder="Enter your Email"
            error={formErrors.CustomerEmail}
            value={formData.CustomerEmail}
            onChange={handleChange("CustomerEmail")}
          />
        </div>

        <Selector
          label="Include Cost"
          type="select"
          value={formData.includeCost}
          error={formErrors.includeCost}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, includeCost: e.target.value }))
          }
          options={[
            { label: "Select", value: "" }, // Default empty value

            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />

        <Selector
          label="Include Receipt"
          type="select"
          value={formData.includeReceipt}
          error={formErrors.includeReceipt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, includeReceipt: e.target.value }))
          }
          options={[
            { label: "Select", value: "" }, // Default empty value

            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />
        {/* <LabeledInput
          label="Customer Address"
          id="address"
          type="text"
          error={formErrors.address}
          placeholder="Customer Address"
          value={formData.address}
          onChange={handleChange("address")}
        /> */}

        <AddressSelector
          label="Customer Address"
          placeholder="Click to find address"
          value={formData.address}
          onClick={() => setIsAddressModalOpen(true)}
          error={formErrors.address}
        />
        <LabeledInput
          label="Customer Phone"
          id="customerPhone"
          type="text"
          error={formErrors.customerPhone}
          placeholder="+44 20 7123 4567"
          value={formData.customerPhone}
          onChange={handleChange("customerPhone")}
        />

          {/* <LabeledInput
          label="Job ID"
          id="jobId"
          type="text"
          error={formErrors.quoteId}
          placeholder="Job ID"
          value={formData.quoteId}
          onChange={handleChange("jobId")}
          helpText="Navigate to the Jobs page, select the Job you wish to attach to the invoice, A pop-up window will appear, Copy the 'Job ID' from this window."
        /> */}





        <div className="md:col-span-1 flex flex-col gap-[6px]">
          {/* <Text variant="h4" className="text-[#344054]">Job ID</Text> */}
          {/* <p className="text-[#344054]">Job ID</p> */}
          <div className="flex gap-2 items-end">
            <div className="w-[100%] ">
               {/* <input
                 placeholder="Enter Job ID"
                 value={formData.jobId}
                 onChange={(e) =>
                   setFormData({ ...formData, jobId: e.target.value })
                 }
                 className={formErrors.jobId ? "border-red-500" : ""}
               /> */}

          <LabeledInput
          label="Enter Job ID"
          id="jobId"
          type="text"
          error={formErrors.jobId}
         placeholder="Enter Job ID"
         value={formData.jobId}
         onChange={handleChange("jobId")}
        
        />
            </div>
            {/* <PrimaryButton
              type="button"
              onClick={() => setIsJobModalOpen(true)}
              className="px-4 whitespace-nowrap"
            >
              Find Job
            </PrimaryButton> */}


            <PrimaryButton
            children="Find Job"
            color="blue"
            onClick={() => setIsJobModalOpen(true)}
            disabled={isLoading}
            loading={isLoading}
            loadingText="Loading..."
            style={{marginTop:"30px"}}
          />
          </div>
          {formErrors.jobId && <p className="text-red-500 text-xs mt-1">{formErrors.jobId}</p>}
       </div>

        <LabeledInput
          label="Google sheet Url"
          id="sheetId"
          type="text"
          error={formErrors.sheetId}
          placeholder="Google spread sheet Url"
          value={formData.sheetId}
          onChange={handleChange("sheetId")}
        />

        <div className="w-[100%]  flex ">
          <PrimaryButton
            children="Add Invoice"
            color="blue"
            onClick={() => handleSubmit()}
            disabled={isLoading}
            loading={isLoading}
            loadingText="Loading..."
          />
        </div>
      </div>
      {/* <StripeConnectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={userId?._id}
        isStripeConnected={crntUser?.stripeAccountId}
        isGoogleConnected={
          crntUser?.googleRefreshToken && crntUser?.googleAccessToken
        }
        isXeroConnected={crntUser?.xeroToken && crntUser?.tenantId}
      /> */}

      <AddressFinderModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSelect={handleAddressSelected}
      />

      <div
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
        }}
      >
        <div ref={pdfRef}>
          {crntUser?.pdfTemplateId === "2" ? (
            <TemplateTwo data={{ ...responseData, type: "invoice" }} />
          ) : (
            <TemplateOne data={{ ...responseData, type: "invoice" }} />
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceScreen;

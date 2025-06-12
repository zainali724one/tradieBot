import React, { useState } from "react";

import UserProfileHeader from "../components/UserProfileHeader";
import { useAddInvoice } from "../reactQuery/mutations/auth";
import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import TextArea from "../components/ui/TextArea";
import Selector from "../components/selector";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function InvoiceScreen() {
  const { AddInvoice, isLoading } = useAddInvoice();
  const userId = useSelector((state) => state.session.userId);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    customerName: "",
    jobDescription: "",
    InvoiceAmount: "",
    CustomerEmail: "",
    includeCost: "", 
    includeReceipt: "", 
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

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
      errors.includeCost = "Include Cos is required";
    }

    if (!formData.includeReceipt.trim()) {
      errors.includeReceipt = "Include Receipt is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("All fields are required");
      return;
    }
    const Addinvoice = {
      userId: userId._id,
      telegramId: userId?.telegramId,
      customerName: formData?.customerName,
      invoiceAmount: formData?.InvoiceAmount,

      jobDescription: formData?.jobDescription,
      customerEmail: formData?.CustomerEmail,
      includeCost: formData.includeCost,
      includeReceipt: formData.includeReceipt,
    };

    AddInvoice(Addinvoice, {
      onSuccess: () => {
        setFormData({
          customerName: "",
          jobDescription: "",
          InvoiceAmount: "",
          CustomerEmail: "",
          includeCost: "", 
          includeReceipt: "",
        });
      },
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-12 px-6 overflow-y-auto ">
      <UserProfileHeader
        image="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
        name="Mr. Thomas John"
        subtitle="Welcome"
      />

      <div className="mt-4 w-full max-h-[70dvh] overflow-y-auto ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Quote
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
            placeholder="$"
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

        <div className="w-[100%]  flex mt-12">
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
    </div>
  );
}

export default InvoiceScreen;

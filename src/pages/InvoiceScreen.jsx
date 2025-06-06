import React, { useState } from "react";

import UserProfileHeader from "../components/UserProfileHeader";
import { useAddInvoice } from "../reactQuery/mutations/auth";
import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import TextArea from "../components/ui/TextArea";
import Selector from "../components/selector";

function InvoiceScreen() {
  const { AddInvoice, isLoading } = useAddInvoice();
  const [formData, setFormData] = useState({
    customerName: "",
    jobDescription: "",
    InvoiceAmount: "",
    // quoteAmount: "",
    CustomerEmail: "",
    includeCost: "", // ✅ Add this
    includeReceipt: "", // ✅ Add this
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Quote Submitted (check console for data)");
  // };

  const handleSubmit = (e) => {
    const customerData = {
      // formData
      userId: "11232321",
      telegramId: "66666",
      customerName: formData?.customerName,
      invoiceAmount: formData?.InvoiceAmount,

      jobDescription: formData?.jobDescription,
      // quoteAmount: formData?.quoteAmount,
      customerEmail: formData?.CustomerEmail,
      includeCost: formData.includeCost,
      includeReceipt: formData.includeReceipt,
    };
    AddInvoice(customerData);
  };

  //   {
  //     "userId": "683de08a0f749ccfc4c12b33",
  //     "telegramId": "1224992255",
  //     "jobDescription": "here is the job ",
  //     "customerName": "zulqarnain",
  //     "invoiceAmount": "50",
  //     "customerEmail": "50",
  //     "includeCost": "Yes",
  //     "includeReceipt": "Yes"
  // }

  return (
    <div className="flex flex-col items-center h-[100dvh] bg-[#D3DCE5] pt-12 px-6 overflow-y-auto ">
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
          // onChange={handleChange}
          onChange={handleChange("customerName")}
        />
        <div className="mt-3">
          <p className="font-[500] text-[14px]">Job Description</p>
          <TextArea
            label="Job Description"
            // id="jobDescription"
            placeholder="Enter job description"
            value={formData.jobDescription}
            // onChange={handleChange}
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
            onChange={handleChange("InvoiceAmount")}
          />
        </div>

        <div className="mt-3">
          <LabeledInput
            label="Customer Email"
            type="CustomerEmail"
            placeholder="Enter your Email"
            value={formData.CustomerEmail}
            onChange={handleChange("CustomerEmail")}
          />
        </div>

        <Selector
          label="Include Cost"
          type="select"
          value={formData.includeCost}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, includeCost: e.target.value }))
          }
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />

        <Selector
          label="Include Receipt"
          type="select"
          value={formData.includeReceipt}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, includeReceipt: e.target.value }))
          }
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />
      </div>
      <div className="w-[90%]  flex fixed bottom-21">
        <PrimaryButton
          children="Continue"
          color="blue"
          onClick={() => handleSubmit()}
          disabled={isLoading}
          loading={isLoading}
          loadingText="Loading..."
        />
      </div>
    </div>
  );
}

export default InvoiceScreen;

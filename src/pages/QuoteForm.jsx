import React, { useState } from "react";

import UserProfileHeader from "../components/UserProfileHeader";
import { useAddQuote } from "../reactQuery/mutations/auth";
import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import TextArea from "../components/ui/TextArea";
import { useSelector } from "react-redux";


function QuoteForm() {
  // const {}
  const { Addquote, isLoading } = useAddQuote();

  const userId = useSelector((state) => state.session.userId);

  const [formData, setFormData] = useState({
    customerName: "",
    jobDescription: "",
    quoteAmount: "",
    customerEmail: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    const customerData = {
      // formData
      userId: userId?._id,
      telegramId: userId?.telegramId,
      customerName: formData?.customerName,
      jobDescription: formData?.jobDescription,
      quoteAmount: formData?.quoteAmount,
      customerEmail: formData?.customerEmail,
    };
    Addquote(customerData);
  };

  return (
    <div className="flex flex-col items-center h-[100dvh] bg-[#D3DCE5] pt-12 px-6 overflow-y-auto ">
      <UserProfileHeader
        image="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
        name="Mr. Thomas John"
        subtitle="Welcome"
      />

      <div className="mt-4 w-full max-h-[64dvh] overflow-y-auto ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Quote
        </h2>
        <LabeledInput
          label="Customer Name"
          // id="customerName"
          // type="text"
          placeholder="Customer Name"
          // value={formData.customerName}
          // onChange={handleChange}
          // value={`$ ${formData.customerName}`}
          value={formData.customerName}
          onChange={handleChange("customerName")}
        />
        <div className="mt-3">
          <p className="font-[500] text-[14px]">Job Description</p>
          <TextArea
            label="Job Description"
            id="jobDescription"
            placeholder="Enter job description"
            // value={formData.jobDescription}
            // value={`$ ${formData.jobDescription}`}
            value={formData.jobDescription}
            onChange={handleChange("jobDescription")}
            className="w-[100%] min-h-[140px] outline-none rounded-[10px] p-3"
            style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
          />
        </div>

        <LabeledInput
          // label="Quote Amount"
          // id="quoteAmount"
          // type="number"
          // placeholder="$ 0.00"
          // value={formData.quoteAmount}
          // onChange={handleChange("quoteAmount")}

          label="Quote Amount"
          placeholder="$ 0.00"
          type="number"
          // error={formErrors.quoteAmount}
          value={formData.quoteAmount}
          onChange={handleChange("quoteAmount")}

          // onChange={handleChange}
        />

        <LabeledInput
          label="Customer Email"
          id="customerEmail"
          type="email"
          placeholder="customer@example.com"
          value={formData.customerEmail}
          onChange={handleChange("customerEmail")}

          // onChange={handleChange}
        />
      </div>
      <div className="w-[90%]  flex fixed bottom-21">
        <PrimaryButton
          //  onClick={handleSubmit}
          //  children="Continue"
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

export default QuoteForm;

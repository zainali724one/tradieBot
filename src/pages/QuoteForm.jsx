import React, { useState } from "react";
// import InputGroup from './InputGroup';
import LabeledInput from "../components/LabeledInput";
import PrimaryButton from "../components/PrimaryButton";
import UserProfile from "../components/ui/UserProfile";
// import TextAreaGroup from './TextAreaGroup';
import TextArea from "../components/ui/TextArea";
import UserProfileHeader from "../components/UserProfileHeader";

function QuoteForm() {
  const [formData, setFormData] = useState({
    customerName: "Lorem Steve",
    jobDescription:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    quoteAmount: "500",
    customerEmail: "xya@gmail.com",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Here you would typically send the data to a backend or handle it further
    alert("Quote Submitted (check console for data)");
  };

  return (
    <div className="h-[100dvh] bg-[#D3DCE5] pt-12 px-5">
      <form
        onSubmit={handleSubmit}
        // className="bg-white rounded-lg p-6 mb-10 bg-[#D3DCE5]"
      >
        <UserProfileHeader
          image="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
          name="Mr. Thomas John"
          subtitle="Welcome"
        />

        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Quote
        </h2>
        <LabeledInput
          label="Customer Name"
          id="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
        />
        <div className="mt-3">
          <p className="font-[500] text-[14px]">Job Description</p>
          <TextArea
            label="Job Description"
            id="jobDescription"
            placeholder="Enter job description"
            value={formData.jobDescription}
            onChange={handleChange}
            className="w-[100%] min-h-[140px] outline-none rounded-[10px] p-3"
            style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
          />
        </div>

        <LabeledInput
          label="Quote Amount"
          id="quoteAmount"
          type="text" // Keep as text to allow '$' symbol display
          placeholder="$ 0.00"
          value={`$ ${formData.quoteAmount}`}
          onChange={handleChange}
        />

        <LabeledInput
          label="Customer Email"
          id="customerEmail"
          type="email"
          placeholder="customer@example.com"
          value={formData.customerEmail}
          onChange={handleChange}
        />

        <div className="w-[100%] mt-2 flex">
          <PrimaryButton onClick={handleSubmit} children="Continue" />
        </div>
      </form>
    </div>
  );
}

export default QuoteForm;

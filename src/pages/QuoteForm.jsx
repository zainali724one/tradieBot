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
    const [formErrors, setFormErrors] = useState({});
  

  const userId = useSelector((state) => state.session.userId);
  const [formData, setFormData] = useState({
    customerName: "",
    jobDescription: "",
    quoteAmount: "",
    customerEmail: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Email validation
    if (!formData.customerEmail.trim()) {
      errors.customerEmail = "Email is required";
    } else if (formData.customerEmail.length < 6) {
      errors.customerEmail = "Email must be at least 6 characters";
    } else if (!emailRegex.test(formData.customerEmail)) {
      errors.customerEmail = "Invalid email format";
    }

    if (!formData.jobDescription.trim()) {
      errors.jobDescription = "Job Description is required";
    }

    if (!formData.customerName.trim()) {
      errors.customerName = "Name  is required";
    }



    if (!formData.quoteAmount.trim()) {
      errors.quoteAmount = "Quote Amount is required";
    }
   

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   if (!validateForm()) {
  //     toast.error("All fields are required");
  //     return;
  //   }
  //   console.log("userId?.telegramId",userId?.telegramId)
  //   const customerData = {
  //     // formData
      // userId: userId?._id,
      // telegramId: userId?.telegramId,
      // customerName: formData?.customerName,
      // jobDescription: formData?.jobDescription,
      // quoteAmount: formData?.quoteAmount,
      // customerEmail: formData?.customerEmail,
  //   };

  //   Addquote(customerData);

 
  // };


  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("All fields are required");
      return;
    }
    const addquot = {
      userId: userId?._id,
      telegramId: userId?.telegramId,
      customerName: formData?.customerName,
      jobDescription: formData?.jobDescription,
      quoteAmount: formData?.quoteAmount,
      customerEmail: formData?.customerEmail,
    };

    Addquote(addquot, {
      onSuccess: () => {
        setFormData({
          customerName: "",
          jobDescription: "",
          quoteAmount: "",
          customerEmail: "",
        });

   
      },
    });
  };
  return (
<div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-12 px-6 pb-28 overflow-auto">
<UserProfileHeader
        image="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
        name="Mr. Thomas John"
        subtitle="Welcome"
      />

      <div className="mt-4 w-full max-h-[64dvh]  ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Quote
        </h2>
        <LabeledInput
          label="Customer Name"
          error={formErrors.customerName}

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
            error={formErrors.jobDescription}

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
          error={formErrors.quoteAmount}

          // error={formErrors.quoteAmount}
          value={formData.quoteAmount}
          onChange={handleChange("quoteAmount")}

          // onChange={handleChange}
        />

        <LabeledInput
          label="Customer Email"
          id="customerEmail"
          type="email"
          error={formErrors.email}

          placeholder="customer@example.com"
          value={formData.customerEmail}
          onChange={handleChange("customerEmail")}

          // onChange={handleChange}
        />

        <div className="w-[100%]  flex mt-15 ">
          <PrimaryButton
            //  onClick={handleSubmit}
            //  children="Continue"
            children="Add Quote"
            color="blue"
            onClick={() => handleSubmit()}
            disabled={isLoading}
            loading={isLoading}
            // loadingText="Loading..."
          />
        </div>
      </div>
    </div>
  );
}

export default QuoteForm;

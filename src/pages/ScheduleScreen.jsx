import React, { useState } from "react";

import UserProfileHeader from "../components/UserProfileHeader";
import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import TextArea from "../components/ui/TextArea";

import { useAddJob } from "../reactQuery/mutations/auth";
import { useSelector } from "react-redux";

function ScheduleScreen() {
  const { usAddJob, isLoading } = useAddJob();
  const userId = useSelector((state) => state.session.userId);

  // useAddJob
  const [formData, setFormData] = useState({
    customerName: "",
    jobDescription: "",
    date: "",
    time: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    // if (!validateForm()) {
    //   toast.error("Please fix the errors before Login.");
    //   return;
    // }
    const addjob = {
      customerName: formData?.customerName,
      jobDescription: formData?.jobDescription,
      telegramId: userId?.telegramId,
      date: formData.date,
      time: formData.time,
      userId: userId._id,
    };
    usAddJob(addjob);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   alert("Quote Submitted (check console for data)");
  // };

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
          id="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange("customerName")}
        />
        <div className="mt-3">
          <p className="font-[500] text-[14px]">Job Description</p>
          <TextArea
            label="Job Description"
            id="jobDescription"
            placeholder="Enter job description"
            value={formData.jobDescription}
            onChange={handleChange("jobDescription")}
            className="w-[100%] min-h-[140px] outline-none rounded-[10px] p-3"
            style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
          />
        </div>

        <LabeledInput
          label="Date"
          type="Date"
          id="Date"
          value={formData.date}
          placeholder="12/12/2025"
          onChange={handleChange("date")}
        />

        <LabeledInput
          label="Time"
          type="time"
          id="Time"
          value={formData.time}
          placeholder="04:00 PM"
          onChange={handleChange("time")}
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

export default ScheduleScreen;

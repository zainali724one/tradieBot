import React, { useEffect, useState } from "react";

import UserProfileHeader from "../components/UserProfileHeader";
import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import TextArea from "../components/ui/TextArea";

import { useAddJob } from "../reactQuery/mutations/auth";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Getuser } from "../api/auth/auth";
import { useNavigate } from "react-router-dom";

function ScheduleScreen() {
  const { usAddJob, isLoading } = useAddJob();
  const userId = useSelector((state) => state.session.userId);
  const [formErrors, setFormErrors] = useState({});
  const navigate =useNavigate();

  // useAddJob
  const [formData, setFormData] = useState({
    customerName:"",
    jobDescription:"",
    date:"",
    time:"",
    quoteId:"",
    sheetId:""
  });

  const validateForm = () => {
    let errors = {};

    if (!formData.jobDescription.trim()) {
      errors.jobDescription = "Job Description is required";
    }

    if (!formData.customerName.trim()) {
      errors.customerName = "Name  is required";
    }

    if (!formData.date.trim()) {
      errors.date = "Date is required";
    }

    if (!formData.time.trim()) {
      errors.time = "time is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // const handleSubmit = () => {
  //   if (!validateForm()) {
  //     toast.error("All fields are required");
  //     return;
  //   }
  //   const addjob = {
  //     customerName: formData?.customerName,
  //     jobDescription: formData?.jobDescription,
  //     telegramId: userId?.telegramId,
  //     date: formData.date,
  //     time: formData.time,
  //     userId: userId._id,
  //   };
  //   usAddJob(addjob);
  // };



  const returnUserData = async (telegramId) => {
    // 8141119319

    Getuser(telegramId)
      .then((res) => {
        // setCrntUser(res?.user);

        setFormData((prevData) => ({
          ...prevData,
          sheetId: res?.user?.sheetId || "",
        }));
        console.log(res, "data is added");
      })
      .catch((err) => {
        localStorage.removeItem("telegramid");
        navigate("/signin");
        console.log(err, "here is the error");
      });
    // return theUser;
  };


  useEffect(() => {
    if (tg) {
      tg.ready();

      if (tg.initDataUnsafe?.user) {
        // setTelegramUserData(tg.initDataUnsafe?.user);
        if (tg?.initDataUnsafe?.user?.id) {
          const userId = tg.initDataUnsafe.user.id;
          returnUserData(userId);
        }
      }
    }
  }, [tg]);




  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("All fields are required");
      return;
    }
    const addjob = {
      customerName: formData?.customerName,
      jobDescription: formData?.jobDescription,
      telegramId: userId?.telegramId,
      date: formData.date,
      time: formData.time,
      userId: userId._id,
      quoteId: formData.quoteId,
      sheetId: formData.sheetId,
    };

    usAddJob(addjob, {

      onSuccess: () => {
        // Reset form data on successful job addition
        setFormData({
          customerName: "",
          jobDescription: "",
          date: "",
          time: "",
          quoteId: "",
        });

        // Optionally show a success message
        toast.success("Job scheduled successfully!");
      },
    });
  };

  const tg = window?.Telegram?.WebApp;
  console.log(tg.initDataUnsafe.user, "here is user");
  const telegramUserData = tg.initDataUnsafe.user;
// const telegramUserData = {}
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-5 px-6 pb-10 overflow-y-auto ">
      <UserProfileHeader
        image={telegramUserData?.photo_url}
        name={telegramUserData?.first_name + " " + telegramUserData?.last_name}
        subtitle="Welcome"
      />

      <div className="mt-4 w-full max-h-[64dvh] overflow-y-auto ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Scedule Job
        </h2>
        <LabeledInput
          label="Customer Name"
          id="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          error={formErrors.customerName}
          onChange={handleChange("customerName")}
        />
        <div className="mt-3">
          <p className="font-[500] text-[14px]">Job Description</p>
          <TextArea
            label="Job Description"
            id="jobDescription"
            placeholder="Enter job description"
            value={formData.jobDescription}
            error={formErrors.jobDescription}
            onChange={handleChange("jobDescription")}
            className="w-[100%] min-h-[140px] outline-none rounded-[10px] p-3"
            style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
          />
        </div>

        <LabeledInput
          label="Quote ID"
          id="quoteId"
          type="text"
          error={formErrors.quoteId}
          placeholder="Quote ID"
          value={formData.quoteId}
          onChange={handleChange("quoteId")}
          helpText="Navigate to the Chase application page, Select the 'Quote' option and click 'Continue', On the following page, select the quote you wish to attach to the job, A pop-up window will appear, Copy the 'Quote ID' from this window."
        />

        <LabeledInput
          label="Date"
          type="Date"
          id="Date"
          value={formData.date}
          error={formErrors.date}
          placeholder="12/12/2025"
          onChange={handleChange("date")}
        />

        <LabeledInput
          label="Time"
          type="time"
          id="Time"
          value={formData.time}
          error={formErrors.time}
          placeholder="04:00 PM"
          onChange={handleChange("time")}
        />


                <LabeledInput
                  label="Google sheet Url"
                  id="sheetId"
                  type="text"
                  error={formErrors.sheetId}
                  placeholder="Google spread sheet Url"
                  value={formData.sheetId}
                  onChange={handleChange("sheetId")}
                />
      </div>
      <div className="w-[90%]  flex">
        <PrimaryButton
          children="Add Job"
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

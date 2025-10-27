import React, { useState, useEffect, useRef } from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import { useAddQuote } from "../reactQuery/mutations/auth";
import PrimaryButton from "../components/PrimaryButton";
import LabeledInput from "../components/LabeledInput";
import TextArea from "../components/ui/TextArea";
import { useSelector } from "react-redux";
import { setAddQuote } from "../store/sessionSlice"; // Import the action
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import StripeConnectModal from "../components/StripeConnectModal";
import { Getuser, uploadPdf } from "../api/auth/auth";
import { useNavigate } from "react-router-dom";
import TemplateTwo from "./TemplateTwo"
import TemplateOne from "./TemplateOne"
import { handleGeneratePdf } from "../services";



function QuoteForm() {
  const dispatch = useDispatch();
  const { Addquote, isLoading } = useAddQuote();
  const [formErrors, setFormErrors] = useState({});
  const [crntUser, setCrntUser] = useState({});
  const [responseData,setResponseData]=useState(null)
  const nevigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const userId = useSelector((state) => state.session.userId);

const [telegramUserData, setTelegramUserData] = useState({});

  const [formData, setFormData] = useState({
    customerName: "",
    jobDescription: "",
    quoteAmount: "",
    customerEmail: "",
    stripeId: "",
    customerPhone: "",
    address:"",
    sheetId: "",
  });


  const returnUserData = async (telegramId) => {
    // 8141119319

    Getuser(telegramId)
      .then((res) => {
        setCrntUser(res?.user);

        setFormData((prevData) => ({
          ...prevData,
          sheetId: res?.user?.sheetId || "",
        }));
        console.log(res, "data is added");
      })
      .catch((err) => {
        localStorage.removeItem("telegramid");
        nevigate("/signin");
        console.log(err, "here is the error");
      });
    // return theUser;
  };


//  const tg = window?.Telegram?.WebApp;
//   useEffect(() => {
   

//     if (tg) {
//       tg.ready(); 

//       if (tg.initDataUnsafe?.user) {
//         setTelegramUserData(tg.initDataUnsafe?.user)
//     if (tg?.initDataUnsafe?.user?.id) {
//       const userId = tg.initDataUnsafe.user.id;
//       returnUserData(userId);
//     }

//   }
// }
//   }, [tg]);



  useEffect(()=>{
 returnUserData("8141119319");
  },[])
  console.log(crntUser, "abc");

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("All fields are required");
      return;
    }

    if (
      !crntUser?.stripeAccountId ||
      !crntUser?.googleRefreshToken ||
      !crntUser?.googleAccessToken ||
      !crntUser?.xeroToken ||
      !crntUser?.tenantId


      
    ) {
      setModalOpen(true);
      return;
    }

    console.log("formData", formData);
    const addquot = {
      userId: userId?._id,
      telegramId: userId?.telegramId,
      customerName: formData?.customerName,
      jobDescription: formData?.jobDescription,
      quoteAmount: formData?.quoteAmount,
      customerEmail: formData?.customerEmail,
      customerPhone: formData?.customerPhone,
      address:formData?.address,
      sheetId: formData?.sheetId,
    };

    localStorage.setItem("addquot", JSON.stringify(addquot));
    dispatch(setAddQuote(addquot));
    // const quoteId = addquot.userId;

    Addquote(addquot, {
      onSuccess: (res) => {
        console.log(res,"here is res from backend")
         setResponseData(res.data)
   
       
        setFormData({
          customerName: "",
          jobDescription: "",
          quoteAmount: "",
          customerEmail: "",
          customerPhone: "",
          address:""
          // stripeId: "", // Reset stripeId after successful submission
        });
      },
    });
  };
const pdfRef = useRef(null);



useEffect(() => {
    if (responseData) {
      
        setTimeout(async () => {
            try {
                const pdfBlob = await handleGeneratePdf(pdfRef, {...responseData,type:"quote"}, crntUser?.pdfTemplateId)
                const formData = new FormData();
                formData.append('file', pdfBlob, 'quote.pdf');
                formData.append('telegramId', responseData?.telegramId);
                formData.append('pdfType', "quote");
                formData.append('customerEmail', responseData?.customerEmail);
                formData.append('customerName', responseData?.customerName);
                   formData.append('customerPhone', responseData?.customerPhone);
                  formData.append('amount', responseData?.amount);
                formData.append('paymentUrl', responseData?.paymentUrl)
                
                await uploadPdf(formData);
            } catch (error) {
                console.error("Failed to generate or upload PDF:", error);
                
            }
        }, 500); 
    }
}, [responseData]);
  return (
    <div className="flex flex-col items-center min-h-[100vh] h-[100%] bg-[#D3DCE5] pt-8 px-6 pb-20 overflow-y-scroll">
      <UserProfileHeader
        image={telegramUserData?.photo_url}
        name={telegramUserData?.first_name + " " + telegramUserData?.last_name}
        subtitle="Welcome"
      />

      <div className="mt-4 w-full   ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">
          Quote
          {/* {crntUser?.data.telegramId} */}
        </h2>
        <LabeledInput
          label="Customer Name"
          error={formErrors.customerName}
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
            error={formErrors.jobDescription}
            value={formData.jobDescription}
            onChange={handleChange("jobDescription")}
            className="w-[100%] min-h-[140px] outline-none rounded-[10px] p-3"
            style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}
          />
        </div>

        <LabeledInput
          label="Quote Amount"
          placeholder="$ 0.00"
          type="number"
          error={formErrors.quoteAmount}
          value={formData.quoteAmount}
          onChange={handleChange("quoteAmount")}
        />

        <LabeledInput
          label="Customer Email"
          id="customerEmail"
          type="email"
          error={formErrors.email}
          placeholder="customer@example.com"
          value={formData.customerEmail}
          onChange={handleChange("customerEmail")}
        />

        <LabeledInput
          label="Customer Address"
          id="address"
          type="text"
          error={formErrors.address}
          placeholder="Customer Address"
          value={formData.address}
          onChange={handleChange("address")}
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

        <LabeledInput
          label="Google sheet id"
          id="sheetId"
          type="text"
          error={formErrors.sheetId}
          placeholder="Google spread sheet id"
          value={formData.sheetId}
          onChange={handleChange("sheetId")}
        />

        {/* <LabeledInput
          label="Stripe Id"
          id="stripeId"
          type="number"
          placeholder="type stripe id"
          value={formData.stripeId}
          onChange={handleChange("stripeId")}
        /> */}

        <div className="w-[100%] flex mt-5">
          <PrimaryButton
            children="Add Quote"
            color="blue"
            onClick={() => handleSubmit()}
            disabled={isLoading}
            loading={isLoading}
          />
        </div>

        <StripeConnectModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          userId={userId?._id}
          isStripeConnected={crntUser?.stripeAccountId}
          isGoogleConnected={
            crntUser?.googleRefreshToken && crntUser?.googleAccessToken
          }
          isXeroConnected={ crntUser?.xeroToken &&
      crntUser?.tenantId}
        />



        <div style={{
    position: 'absolute',
    left: '-9999px',
    top: 0,

  }}>
        <div ref={pdfRef}>

        {crntUser?.pdfTemplateId==="2"?
        <TemplateTwo data={{...responseData,type:"quote"}}/>
        :
        <TemplateOne data={{...responseData,type:"quote"}}/>
        }
      
        </div>
      </div>
      </div>
    </div>
  );
}

export default QuoteForm;

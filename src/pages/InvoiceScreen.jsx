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
import TemplateTwo from "./TemplateTwo";
import TemplateOne from "./TemplateOne";
import { handleGeneratePdf } from "../services";
import AddressSelector from "../components/AddressSelector";
import AddressFinderModal from "../components/AddressFinderModal";
import JobSelectorModal from "../components/JobSelectorModal";

function InvoiceScreen() {
  // const { AddInvoice, isLoading } = useAddInvoice();
  const { AddInvoice, isLoading: isBackendLoading } = useAddInvoice();
  
  // 1. NEW STATE: specific for PDF generation
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const isBusy = isBackendLoading || isGeneratingPdf
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const userId = useSelector((state) => state.session.userId);
  const [formErrors, setFormErrors] = useState({});
  const [crntUser, setCrntUser] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [telegramUserData, setTelegramUserData] = useState({});
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [pdfDocType, setPdfDocType] = useState("invoice");

  // --- NEW: Internal State for Expenses ---
  const [materialCost, setMaterialCost] = useState("");
  const [supplierReceipt, setSupplierReceipt] = useState(null);

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
    jobId: "", // Ensure jobId is initialized
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const returnUserData = async (telegramId) => {
    Getuser(telegramId)
      .then((res) => {
        if (res?.user.isApproved !== "Accepted") {
          localStorage.removeItem("telegramid");
          // navigate("/signin"); // Fixed typo 'nevigate'
        }
        setCrntUser(res?.user);
        setFormData((prevData) => ({
          ...prevData,
          sheetId: res?.user?.sheetId || "",
        }));
      })
      .catch((err) => {
        console.log(err, "here is the error");
      });
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

    if (!formData.jobDescription.trim()) errors.jobDescription = "Job Description is required";
    if (!formData.customerName.trim()) errors.customerName = "Name is required";
    if (!formData.InvoiceAmount.trim()) errors.InvoiceAmount = "Invoice Amount is required";
    if (!formData.includeCost.trim()) errors.includeCost = "Include Cost is required";
    if (!formData.includeReceipt.trim()) errors.includeReceipt = "Include Receipt is required";
    if (!formData.sheetId.trim()) errors.sheetId = "Google sheet id is required"; // Fixed key
    if (!formData.customerPhone.trim()) errors.customerPhone = "Phone number is required"; // Fixed key
    if (!formData.jobId.trim()) errors.jobId = "Job ID is required";
    if(formData.includeReceipt === "Yes" && !materialCost.trim()) errors.materialCost = "Material cost is required when including receipt"; 

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      toast.error("All fields are required");
      return;
    }
    setIsGeneratingPdf(true)

    // Prepare payload
    // Note: If you need to send the 'supplierReceipt' file to the backend here,
    // you might need to convert this to FormData or handle the file upload separately.
    // For now, we pass the text fields as requested.
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
      // --- NEW: Sending Internal Data to Backend ---
      materialCost: materialCost, // Backend should save this to DB/Sheet but NOT put it on PDF
      profit: (parseFloat(formData.InvoiceAmount) - parseFloat(materialCost || 0)).toFixed(2),
      // If your backend supports file upload in this mutation, append supplierReceipt here
      // supplierReceiptFile: supplierReceipt 
    };

    AddInvoice(Addinvoice, {
      onSuccess: (res) => {
        setResponseData(res.data);
        // Reset form
        setFormData({
            customerName: "",
            jobDescription: "",
            InvoiceAmount: "",
            CustomerEmail: "",
            includeCost: "",
            includeReceipt: "",
            sheetId: crntUser?.sheetId || "", // Keep sheetId if possible
            address: "",
            customerPhone: "",
            jobId: "",
        });
        // Reset Internal Fields
        setMaterialCost("");
        setIsGeneratingPdf(false)
        setSupplierReceipt(null);
      },
      onError: (error) => {
        setIsGeneratingPdf(false)
        console.error("Error adding invoice:", error);
        toast.error("Failed to add invoice. Please try again.");
      },
    });
  };

  const pdfRef = useRef(null);

  // --- UPDATED PDF GENERATION LOGIC ---
  // useEffect(() => {
  //   if (responseData) {
  //     setTimeout(async () => {
  //       try {
  //         // 1. Determine Type: If Include Receipt is YES, we generate a RECEIPT.
  //         // Otherwise, we generate a standard INVOICE.
  //         const docType = formData.includeReceipt === "Yes" ? "RECEIPT" : "INVOICE";
          
  //         // 2. Generate PDF with the correct type
  //         const pdfBlob = await handleGeneratePdf(
  //           pdfRef,
  //           { ...responseData, type: docType }, // Pass docType to template
  //           crntUser?.pdfTemplateId
  //         );

  //         const uploadData = new FormData();
  //         uploadData.append("file", pdfBlob, `${docType.toLowerCase()}.pdf`);
  //         uploadData.append("telegramId", responseData?.telegramId);
  //         // 3. Send the type to backend so it knows which email template to use
  //         uploadData.append("pdfType", docType.toLowerCase()); 
  //         uploadData.append("customerEmail", responseData?.customerEmail);
  //         uploadData.append("customerName", responseData?.customerName);
  //         uploadData.append("customerPhone", responseData?.customerPhone);
  //         uploadData.append("amount", responseData?.amount);
  //         uploadData.append("paymentUrl", responseData?.paymentUrl);

  //         await uploadPdf(uploadData);
  //       } catch (error) {
  //         console.error("Failed to generate or upload PDF:", error);
  //       }
  //     }, 500);
  //   }
  // }, [responseData]);



  useEffect(() => {
  if (responseData) {
    const generateAndSend = async () => {
      // --- HELPER FUNCTION ---
      const createPdf = async (type) => {
        try {
          // 1. Update State to change Template Text (Invoice -> Receipt)
          setPdfDocType(type); 
          
          // 2. Wait for React to re-render the DOM (CRITICAL STEP)
          await new Promise((resolve) => setTimeout(resolve, 500));

          // 3. Generate PDF Blob
          const pdfBlob = await handleGeneratePdf(
            pdfRef,
            { ...responseData, type: type },
            crntUser?.pdfTemplateId
          );

          // 4. Prepare Upload
          const uploadData = new FormData();
          uploadData.append("file", pdfBlob, `${type.toLowerCase()}.pdf`);
          uploadData.append("telegramId", responseData?.telegramId);
          uploadData.append("_id", responseData?._id);
          uploadData.append("jobDescription", responseData?.jobDescription || "");
          uploadData.append("pdfType", type.toLowerCase()); // 'invoice' or 'receipt'
          uploadData.append("customerEmail", responseData?.customerEmail);
          uploadData.append("customerName", responseData?.customerName);
          uploadData.append("customerPhone", responseData?.customerPhone);
          uploadData.append("amount", responseData?.amount);
          uploadData.append("paymentUrl", responseData?.paymentUrl);
          if(responseData.includeReceipt === "Yes") {
            uploadData.append("materialCost", responseData?.materialCost || "0.00");
             uploadData.append("profit", responseData?.profit || "0.00");
          }

          // 5. Send to Backend
          await uploadPdf(uploadData);
          console.log(`${type} uploaded successfully`);

        } catch (error) {
          console.error(`Failed to process ${type}:`, error);
          toast.error(`Failed to send ${type}`);
        }
      };

      // --- EXECUTION FLOW ---
      
      // 1. Always generate and send INVOICE
      await createPdf("INVOICE");

      // 2. Check if user wants RECEIPT
      if (responseData?.includeReceipt === "Yes"){
        // Wait a bit to ensure clean state transition

        console.log("Generating receipt as well...");
        await new Promise((resolve) => setTimeout(resolve, 200));
        await createPdf("RECEIPT");
      }
      setIsGeneratingPdf(false);
    };

    generateAndSend();
  }
}, [responseData]);

  const handleAddressSelected = (fullAddress) => {
    setFormData((prev) => ({ ...prev, address: fullAddress }));
    setFormErrors((prev) => ({ ...prev, address: "" }));
    setIsAddressModalOpen(false);
  };

  const handleJobSelect = (job) => {
    setFormData({
      ...formData,
      jobId: job.chaseId || job._id, // Use chaseId if available for display
      customerName: formData.customerName || job.customerName || "",
      jobDescription: formData.jobDescription || job.description || "",
      address: formData.address || job.address || "",
    });
    setIsJobModalOpen(false);
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

        {/* --- EXISTING FORM FIELDS --- */}
        <LabeledInput
          label="Customer Name"
          placeholder="Customer Name"
          value={formData.customerName}
          error={formErrors.customerName}
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
            placeholder="Enter your Email"
            error={formErrors.CustomerEmail}
            value={formData.CustomerEmail}
            onChange={handleChange("CustomerEmail")}
          />
        </div>

        <Selector
          label="Include Cost (Show on PDF?)"
          type="select"
          value={formData.includeCost}
          error={formErrors.includeCost}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, includeCost: e.target.value }))
          }
          options={[
            { label: "Select", value: "" },
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
            { label: "Select", value: "" },
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />

        <AddressSelector
          label="Customer Address"
          placeholder="Click to find address"
          value={formData.address}
          onClick={() => setIsAddressModalOpen(true)}
          error={formErrors.address}
        />

        <LabeledInput
          label="Customer Phone"
          placeholder="+44 20 7123 4567"
          value={formData.customerPhone}
          error={formErrors.customerPhone}
          onChange={handleChange("customerPhone")}
        />

        {/* --- JOB SELECTION SECTION --- */}
        <div className="md:col-span-1 flex flex-col gap-[6px] mt-3">
          <div className="flex gap-2 items-end">
            <div className="w-[100%]">
              <LabeledInput
                label="Job ID"
                placeholder="Enter Job ID"
                value={formData.jobId}
                error={formErrors.jobId}
                onChange={handleChange("jobId")}
              />
            </div>
            <PrimaryButton
              children="Find"
              color="blue"
              onClick={() => setIsJobModalOpen(true)}
              style={{ marginBottom: "20px", height: "50px" }}
            />
          </div>
        </div>

        <LabeledInput
          label="Google sheet Url"
          placeholder="Google spread sheet Url"
          value={formData.sheetId}
          error={formErrors.sheetId}
          onChange={handleChange("sheetId")}
        />

        {/* --- NEW SECTION: INTERNAL EXPENSES (Hidden from Customer) --- */}
        <div className="mt-8 mb-6 p-4 bg-gray-100 border border-gray-300 rounded-xl">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-300 pb-2">
             {/* Optional Lock Icon */}
             <span role="img" aria-label="lock">🔒</span>
             <div>
                <h3 className="font-bold text-gray-700 text-sm uppercase">Internal Use Only</h3>
                <p className="text-[10px] text-gray-500">Recorded in database/sheet only. Not shown on PDF.</p>
             </div>
          </div>

          <div className="grid gap-4">
             {/* 1. Material Cost */}
             <LabeledInput
                label="Material/Part Costs (£)"
                type="number"
                placeholder="0.00"
                value={materialCost}
                onChange={(e) => setMaterialCost(e.target.value)}
             />

             {/* 2. Profit Calculation */}
             <div className="flex justify-between items-center bg-white p-3 rounded border">
                <span className="text-sm font-medium text-gray-600">Estimated Profit:</span>
                <span className={`text-lg font-bold ${
                    (parseFloat(formData.InvoiceAmount || 0) - parseFloat(materialCost || 0)) >= 0 
                    ? 'text-green-600' 
                    : 'text-red-500'
                }`}>
                    £{(parseFloat(formData.InvoiceAmount || 0) - parseFloat(materialCost || 0)).toFixed(2)}
                </span>
             </div>

             {/* 3. Supplier Receipt Upload */}
             {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Supplier Receipt</label>
                <input 
                  type="file" 
                  accept="image/*,application/pdf"
                  onChange={(e) => setSupplierReceipt(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
             </div> */}
          </div>
        </div>
        {/* --- END INTERNAL SECTION --- */}

        <div className="w-[100%] flex mt-4">
          <PrimaryButton
            children="Submit & Generate PDF"
            color="blue"
            onClick={() => handleSubmit()}
            disabled={isGeneratingPdf || isBusy}
            loading={isGeneratingPdf || isBusy}
            loadingText={isGeneratingPdf ? "Generating PDFs..." : "Saving..."}
          />
        </div>
      </div>

      <AddressFinderModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onAddressSelect={handleAddressSelected}
      />

      <JobSelectorModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onSelect={handleJobSelect}
      />

      {/* --- HIDDEN PDF TEMPLATE RENDERER --- */}
      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div ref={pdfRef}>
          {crntUser?.pdfTemplateId === "2" ? (
            <TemplateTwo data={{ ...responseData,type: pdfDocType }} /> 
          ) : (
            <TemplateOne data={{ ...responseData ,type:pdfDocType}} />
          )}
        </div>
      </div>
    </div>
  );
}

export default InvoiceScreen;
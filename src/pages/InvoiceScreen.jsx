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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import TemplateTwo from "./TemplateTwo";
import TemplateOne from "./TemplateOne";
import { handleGeneratePdf } from "../services";
import AddressSelector from "../components/AddressSelector";
import AddressFinderModal from "../components/AddressFinderModal";
import JobSelectorModal from "../components/JobSelectorModal";

function InvoiceScreen() {
  const { AddInvoice, isLoading: isBackendLoading } = useAddInvoice();
  
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const isBusy = isBackendLoading || isGeneratingPdf;
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const userId = useSelector((state) => state.session.userId);
  const [formErrors, setFormErrors] = useState({});
  const [crntUser, setCrntUser] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [telegramUserData, setTelegramUserData] = useState({});
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [pdfDocType, setPdfDocType] = useState("invoice");

  // --- Internal State for Expenses ---
  const [materialCost, setMaterialCost] = useState("");
  // const [supplierReceipt, setSupplierReceipt] = useState(null);
  
  // NEW: State for tracking file upload status
  const [materialInvoiceFiles, setMaterialInvoiceFiles] = useState([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

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
    jobId: "",
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

    if (!formData.CustomerEmail.trim()) errors.CustomerEmail = "Email is required";
    else if (formData.CustomerEmail.length < 6) errors.CustomerEmail = "Email must be at least 6 characters";
    else if (!emailRegex.test(formData.CustomerEmail)) errors.CustomerEmail = "Invalid email format";

    if (!formData.jobDescription.trim()) errors.jobDescription = "Job Description is required";
    if (!formData.customerName.trim()) errors.customerName = "Name is required";
    if (!formData.InvoiceAmount.trim()) errors.InvoiceAmount = "Invoice Amount is required";
    if (!formData.includeCost.trim()) errors.includeCost = "Include Cost is required";
    if (!formData.includeReceipt.trim()) errors.includeReceipt = "Include Receipt is required";
    if (!formData.sheetId.trim()) errors.sheetId = "Google sheet id is required";
    if (!formData.customerPhone.trim()) errors.customerPhone = "Phone number is required";
    if (!formData.jobId.trim()) errors.jobId = "Job ID is required";
    if(formData.includeReceipt === "Yes" && !materialCost.trim()) errors.materialCost = "Material cost is required when including receipt"; 

    // NEW: Ensure all selected images are actually uploaded before submitting
    const hasPendingUploads = materialInvoiceFiles.some(f => f.status === 'pending');
    if (hasPendingUploads) {
      toast.error("Please click 'Upload Images' before submitting.");
      return false; // Stop validation
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // --- SEPARATE UPLOAD FUNCTION ---



  // const handleUploadImagesToFirebase = async () => {
  //   const pendingFiles = materialInvoiceFiles.filter(f => f.status === 'pending');
  //   if (pendingFiles.length === 0) return;

  //   setIsUploadingImages(true);
    
  //   // 1. Mark ALL pending files as 'uploading' at once so the UI updates immediately
  //   setMaterialInvoiceFiles(prev => 
  //     prev.map(f => f.status === 'pending' ? { ...f, status: 'uploading' } : f)
  //   );

  //   const basePath = `materialInvoices/${userId?.telegramId || userId?._id}`;

  //   try {
  //     // 2. Use a sequential for...of loop instead of Promise.all
  //     // This uploads Image 1, THEN Image 2, etc. It stops Firebase from hanging/choking.
  //     for (const item of pendingFiles) {
  //       try {
  //         // 3. Make the filename 100% unique by including the item.id
  //         const safeName = `${Date.now()}_${item.id}_${item.file.name.replace(/\s+/g, "_")}`;
  //         const storageRef = ref(storage, `${basePath}/${safeName}`);
          
  //         await uploadBytes(storageRef, item.file);
  //         const downloadURL = await getDownloadURL(storageRef);

  //         // Update state for THIS specific file to 'uploaded'
  //         setMaterialInvoiceFiles(prev => 
  //           prev.map(f => f.id === item.id ? { ...f, status: 'uploaded', firebaseURL: downloadURL } : f)
  //         );
          
  //       } catch (fileError) {
  //         console.error(`Error uploading file ${item.file.name}:`, fileError);
  //         // If ONE file fails, revert just that file back to pending so the user can retry
  //         // It won't break the rest of the uploads!
  //         setMaterialInvoiceFiles(prev => 
  //           prev.map(f => f.id === item.id ? { ...f, status: 'pending' } : f)
  //         );
  //         // toast.error(`Failed to upload ${item.file.name}`);
  //           toast.success("Image uploading finished!");
  //       }
  //     }

  //     toast.success("Image uploading finished!");

  //   } catch (error) {
  //     console.error("Fatal error in image upload process:", error);
  //   } finally {
  //     setIsUploadingImages(false);
      
  //     // Safety net: If anything is STILL stuck on 'uploading' (due to a rare crash),
  //     // revert it back to 'pending' so the user isn't stuck forever.
  //     setMaterialInvoiceFiles(prev => 
  //       prev.map(f => f.status === 'uploading' ? { ...f, status: 'pending' } : f)
  //     );
  //   }
  // };





const handleUploadImagesToFirebase = async () => {
    const pendingFiles = materialInvoiceFiles.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    setIsUploadingImages(true);
    
    // 1. Mark ALL pending files as 'uploading' at once so the UI updates immediately
    setMaterialInvoiceFiles(prev => 
      prev.map(f => f.status === 'pending' ? { ...f, status: 'uploading' } : f)
    );

    const basePath = `materialInvoices/${userId?.telegramId || userId?._id}`;
    let successCount = 0;
    let failCount = 0;

    try {
      // 2. Sequential loop to prevent network choking
      for (const item of pendingFiles) {
        
        let attempt = 0;
        const maxRetries = 3; // Try up to 3 times per image
        let isUploaded = false;

        // --- RETRY LOOP ---
        while (attempt < maxRetries && !isUploaded) {
          try {
            const safeName = `${Date.now()}_${item.id}_${item.file.name.replace(/\s+/g, "_")}`;
            const storageRef = ref(storage, `${basePath}/${safeName}`);
            
            // Upload the file
            await uploadBytes(storageRef, item.file);
            const downloadURL = await getDownloadURL(storageRef);

            // Update state to 'uploaded'
            setMaterialInvoiceFiles(prev => 
              prev.map(f => f.id === item.id ? { ...f, status: 'uploaded', firebaseURL: downloadURL } : f)
            );
            
            isUploaded = true;
            successCount++;

          } catch (fileError) {
            attempt++;
            console.warn(`Attempt ${attempt} failed for ${item.file.name}. Retrying...`);
            
            if (attempt >= maxRetries) {
              console.error(`Final failure for ${item.file.name}:`, fileError);
              
              // Revert this specific file back to 'pending'
              setMaterialInvoiceFiles(prev => 
                prev.map(f => f.id === item.id ? { ...f, status: 'pending' } : f)
              );
              failCount++;
            } else {
              // Wait 1 second before retrying (Exponential backoff)
              await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
          }
        }
        // --- END RETRY LOOP ---
      }

      // Show final feedback to the user
      if (failCount === 0) {
        toast.success(`Successfully uploaded all ${successCount} images!`);
      } else if (successCount > 0) {
        toast.warning(`Uploaded ${successCount} images, but ${failCount} failed. Try again.`);
      } else {
        toast.error("Failed to upload images. Check your connection.");
      }

    } catch (error) {
      console.error("Fatal error in image upload process:", error);
    } finally {
      setIsUploadingImages(false);
      
      // Safety net: Revert any stuck 'uploading' files back to 'pending'
      setMaterialInvoiceFiles(prev => 
        prev.map(f => f.status === 'uploading' ? { ...f, status: 'pending' } : f)
      );
    }
  };




  const handleMaterialInvoicesChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const imageFiles = files.filter((f) => f.type.startsWith("image/"));

    setMaterialInvoiceFiles((prev) => {
      const newFiles = imageFiles.filter(newFile => !prev.some(existingFile => 
          existingFile.file.name === newFile.name && existingFile.file.size === newFile.size
        )
      );

      const filesWithPreviews = newFiles.map(file => ({
        id: Math.random().toString(36).substring(7), // Unique ID for tracking
        file: file,
        previewUrl: URL.createObjectURL(file),
        status: 'pending', // NEW: 'pending', 'uploading', 'uploaded'
        firebaseURL: null
      }));

      return [...prev, ...filesWithPreviews];
    });

    e.target.value = ""; 
  };

  const removeMaterialInvoice = (idToRemove) => {
    setMaterialInvoiceFiles((prev) => {
      const fileToRemove = prev.find(f => f.id === idToRemove);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl); 
      }
      return prev.filter(f => f.id !== idToRemove);
    });
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Error toast is handled inside validateForm now
    }

    setIsGeneratingPdf(true); 

    // Extract the ALREADY UPLOADED urls
    const materialInvoices = materialInvoiceFiles
        .filter(f => f.status === 'uploaded')
        .map(f => f.firebaseURL);

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
      materialCost: materialCost,
      profit: (parseFloat(formData.InvoiceAmount) - parseFloat(materialCost || 0)).toFixed(2),
      materialInvoices: materialInvoices, // Send the array of URLs
    };

    AddInvoice(Addinvoice, {
      onSuccess: (res) => {
        // ONLY trigger PDF generation. Don't clear form yet.
        setResponseData(res.data);
      },
      onError: (error) => {
        setIsGeneratingPdf(false);
        console.error("Error adding invoice:", error);
        toast.error("Failed to add invoice. Please try again.");
      },
    });
  };

  const pdfRef = useRef(null);

  useEffect(() => {
    if (responseData) {
      const generateAndSend = async () => {
        const createPdf = async (type) => {
          try {
            setPdfDocType(type); 
            await new Promise((resolve) => setTimeout(resolve, 500));

            const pdfBlob = await handleGeneratePdf(
              pdfRef,
              { ...responseData, type: type },
              crntUser?.pdfTemplateId
            );

            const uploadData = new FormData();
            uploadData.append("file", pdfBlob, `${type.toLowerCase()}.pdf`);
            uploadData.append("telegramId", responseData?.telegramId);
            uploadData.append("_id", responseData?._id);
            uploadData.append("jobDescription", responseData?.jobDescription || "");
            uploadData.append("pdfType", type.toLowerCase());
            uploadData.append("customerEmail", responseData?.customerEmail);
            uploadData.append("customerName", responseData?.customerName);
            uploadData.append("customerPhone", responseData?.customerPhone);
            uploadData.append("amount", responseData?.amount);
            uploadData.append("paymentUrl", responseData?.paymentUrl);
            
            if(responseData.includeReceipt === "Yes") {
              uploadData.append("materialCost", responseData?.materialCost || "0.00");
              uploadData.append("profit", responseData?.profit || "0.00");
            }

            await uploadPdf(uploadData);
            console.log(`${type} uploaded successfully`);

          } catch (error) {
            console.error(`Failed to process ${type}:`, error);
            toast.error(`Failed to send ${type}`);
          }
        };

        // --- EXECUTION FLOW ---
        await createPdf("INVOICE");

        if (responseData?.includeReceipt === "Yes"){
          console.log("Generating receipt as well...");
          await new Promise((resolve) => setTimeout(resolve, 200));
          await createPdf("RECEIPT");
        }
        
        // Final Cleanup
        setIsGeneratingPdf(false);
        setResponseData(null);
        setFormData({
            customerName: "", jobDescription: "", InvoiceAmount: "", CustomerEmail: "",
            includeCost: "", includeReceipt: "", sheetId: crntUser?.sheetId || "",
            address: "", customerPhone: "", jobId: "",
        });
        setMaterialCost("");
        setMaterialInvoiceFiles([]);
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
      jobId: job.chaseId || job._id,
      customerName: formData.customerName || job.customerName || "",
      jobDescription: formData.jobDescription || job.description || "",
      address: formData.address || job.address || "",
    });
    setIsJobModalOpen(false);
  };

  const pendingUploadsCount = materialInvoiceFiles.filter(f => f.status === 'pending').length;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-9 px-6 pb-20 overflow-y-auto ">
      <UserProfileHeader
        image={telegramUserData?.photo_url}
        name={telegramUserData?.first_name + " " + telegramUserData?.last_name}
        subtitle="Welcome"
      />

      <div className="mt-4 w-full max-h-[70dvh] overflow-y-auto ">
        <h2 className="text-lg text-[#5290C1] font-semibold font-poppins">Invoice</h2>

        {/* --- FORM FIELDS --- */}
        <LabeledInput label="Customer Name" placeholder="Customer Name" value={formData.customerName} error={formErrors.customerName} onChange={handleChange("customerName")} />
        <div className="mt-3"><p className="font-[500] text-[14px]">Job Description</p><TextArea label="Job Description" placeholder="Enter job description" value={formData.jobDescription} error={formErrors.jobDescription} onChange={handleChange("jobDescription")} className="w-[100%] min-h-[140px] outline-none rounded-[10px] p-3" style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }} /></div>
        <div className="mt-3"><LabeledInput label="Invoice Amount" type="number" placeholder="£ 0.00" value={formData.InvoiceAmount} error={formErrors.InvoiceAmount} onChange={handleChange("InvoiceAmount")} /></div>
        <div className="mt-3"><LabeledInput label="Customer Email" placeholder="Enter your Email" error={formErrors.CustomerEmail} value={formData.CustomerEmail} onChange={handleChange("CustomerEmail")} /></div>
        
        <Selector label="Include Cost (Show on PDF?)" type="select" value={formData.includeCost} error={formErrors.includeCost} onChange={(e) => setFormData((prev) => ({ ...prev, includeCost: e.target.value }))} options={[{ label: "Select", value: "" }, { label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} />
        <Selector label="Include Receipt" type="select" value={formData.includeReceipt} error={formErrors.includeReceipt} onChange={(e) => setFormData((prev) => ({ ...prev, includeReceipt: e.target.value }))} options={[{ label: "Select", value: "" }, { label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} />
        
        <AddressSelector label="Customer Address" placeholder="Click to find address" value={formData.address} onClick={() => setIsAddressModalOpen(true)} error={formErrors.address} />
        <LabeledInput label="Customer Phone" placeholder="+44 20 7123 4567" value={formData.customerPhone} error={formErrors.customerPhone} onChange={handleChange("customerPhone")} />

        {/* --- JOB SELECTION SECTION --- */}
        <div className="md:col-span-1 flex flex-col gap-[6px] mt-3">
          <div className="flex gap-2 items-end">
            <div className="w-[100%]"><LabeledInput label="Job ID" placeholder="Enter Job ID" value={formData.jobId} error={formErrors.jobId} onChange={handleChange("jobId")} /></div>
            <PrimaryButton children="Find" color="blue" onClick={() => setIsJobModalOpen(true)} style={{ marginBottom: "20px", height: "50px" }} />
          </div>
        </div>

        <LabeledInput label="Google sheet Url" placeholder="Google spread sheet Url" value={formData.sheetId} error={formErrors.sheetId} onChange={handleChange("sheetId")} />

        {/* --- NEW SECTION: INTERNAL EXPENSES --- */}
        <div className="mt-8 mb-6 p-4 bg-gray-100 border border-gray-300 rounded-xl">
          <div className="flex items-center gap-2 mb-4 border-b border-gray-300 pb-2">
             <span role="img" aria-label="lock">🔒</span>
             <div>
                <h3 className="font-bold text-gray-700 text-sm uppercase">Internal Expenses</h3>
                <p className="text-[10px] text-gray-500">Not shown on PDF.</p>
             </div>
          </div>

          <div className="grid gap-4">
             <LabeledInput label="Material/Part Costs (£)" type="number" placeholder="0.00" value={materialCost} error={formErrors.materialCost} onChange={(e) => setMaterialCost(e.target.value)} />
             
             <div className="flex justify-between items-center bg-white p-3 rounded border">
                <span className="text-sm font-medium text-gray-600">Estimated Profit:</span>
                <span className={`text-lg font-bold ${(parseFloat(formData.InvoiceAmount || 0) - parseFloat(materialCost || 0)) >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    £{(parseFloat(formData.InvoiceAmount || 0) - parseFloat(materialCost || 0)).toFixed(2)}
                </span>
             </div>

             {/* IMAGE UPLOAD UI */}
             <div className="mt-2">
                <p className="font-[500] text-[14px] text-gray-700 mb-1">Hardware Receipts</p>
                <div className="rounded-[10px] border-2 border-dashed border-[#5290C1]/40 bg-white/50 p-4" style={{ boxShadow: "1px 1px 4px 4px #5290C11A inset" }}>
                  <input type="file" accept="image/*" multiple onChange={handleMaterialInvoicesChange} className="hidden" id="material-invoices-input" />
                  <label htmlFor="material-invoices-input" className="flex flex-col items-center justify-center py-4 px-3 cursor-pointer rounded-lg">
                    <span className="text-sm font-medium text-[#5290C1]">+ Add Photos</span>
                  </label>
                  
                  {materialInvoiceFiles.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200/80 flex flex-col gap-3">
                      
                      {/* Grid of Images with Status Overlays */}
                      <div className="flex flex-wrap gap-2">
                        {materialInvoiceFiles.map((item) => (
                          <div key={item.id} className="relative group w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            <img src={item.previewUrl} alt="receipt" className={`w-full h-full object-cover ${item.status === 'uploading' ? 'opacity-50 grayscale' : ''}`} />
                            
                            {/* Status Indicators */}
                            {item.status === 'uploaded' && (
                              <div className="absolute top-1 right-1 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center">
                                <span className="text-white text-[10px]">✓</span>
                              </div>
                            )}
                            {item.status === 'uploading' && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            )}

                            {/* Delete Button (Only if not currently uploading) */}
                            {item.status !== 'uploading' && (
                              <button type="button" onClick={() => removeMaterialInvoice(item.id)} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <span className="text-white font-bold">X</span>
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Manual Upload Action Button */}
                      {pendingUploadsCount > 0 && (
                        <div className="flex justify-end border-t pt-2">
                           <button 
                             type="button" 
                             onClick={handleUploadImagesToFirebase}
                             disabled={isUploadingImages}
                             className="bg-blue-600 text-white text-xs px-4 py-2 rounded shadow hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
                           >
                              {isUploadingImages ? 'Uploading...' : `Upload ${pendingUploadsCount} New Image(s)`}
                           </button>
                        </div>
                      )}

                    </div>
                  )}
                </div>
             </div>
          </div>
        </div>
        {/* --- END INTERNAL SECTION --- */}

        <div className="w-[100%] flex mt-4">
          <PrimaryButton
            children="Submit & Generate PDF"
            color="blue"
            onClick={() => handleSubmit()}
            disabled={isGeneratingPdf || isBusy || isUploadingImages || pendingUploadsCount > 0} // Disable if images need uploading
            loading={isGeneratingPdf || isBusy}
            loadingText={isGeneratingPdf ? "Generating PDFs..." : "Saving..."}
          />
        </div>
      </div>

      <AddressFinderModal isOpen={isAddressModalOpen} onClose={() => setIsAddressModalOpen(false)} onAddressSelect={handleAddressSelected} />
      <JobSelectorModal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} onSelect={handleJobSelect} />

      <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
        <div ref={pdfRef}>
          {crntUser?.pdfTemplateId === "2" ? <TemplateTwo data={{ ...responseData,type: pdfDocType }} /> : <TemplateOne data={{ ...responseData ,type:pdfDocType}} />}
        </div>
      </div>
    </div>
  );
}

export default InvoiceScreen;
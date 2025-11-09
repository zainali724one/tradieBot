import React, { useEffect, useState } from "react";
import { useGetChases } from "../reactQuery/queries/queries";
import { InfoCard } from "../components/InfoCard";
import { IoArrowBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import invoiceImage from "../assets/icons/invoice.png";
// ✅ NEW
import { useDeleteChase } from "../reactQuery/mutations/auth";

const StatusModal = ({ open, onClose, onDelete, data, type, deleting }) => {
  const [copied, setCopied] = useState(false);

  // Reset the "copied" state when the modal is opened or closed
  useEffect(() => {
    if (open) {
      setCopied(false);
    }
  }, [open]);

  if (!open) return null;

  const isQuote = type === "quote";
  const isInvoice = type === "invoice";

  /**
   * Handles copying the Quote ID to the clipboard.
   * Uses document.execCommand for iFrame compatibility.
   */
  const handleCopy = () => {
    if (data?._id) {
      const tempInput = document.createElement("input");
      tempInput.value = data._id;
      document.body.appendChild(tempInput);
      tempInput.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        // Reset the "Copied" message after 2 seconds
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy ID: ", err);
        // You could show an error state to the user here
      }
      document.body.removeChild(tempInput);
    }
  };

  return (
    // Modal Backdrop
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        onClick={(e) => e.stopPropagation()} // Prevent modal close on content click
      >
        <h3 className="text-lg font-semibold text-[#1980d4] mb-3">
          {isQuote ? "Quote" : "Invoice"} Details
        </h3>

        <div className="space-y-2 text-sm">
          {/* ✅ Always show Customer Name */}
          <div className="flex items-center justify-between py-1">
            <span className="text-gray-600">Customer Name</span>
            <span className="font-medium text-gray-900">
              {data?.customerName || "—"}
            </span>
          </div>

          {/* ✅ Only for Quote: show Quote ID and Copy Button */}
          {isQuote && (
            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600">Quote ID</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900 truncate max-w-[150px]">
                  {data?._id || "—"}
                </span>
                <button
                  onClick={handleCopy}
                  disabled={copied}
                  className={`relative flex items-center justify-center text-sm rounded-md p-1 ${
                    copied
                      ? "text-green-600"
                      : "text-gray-500 hover:text-blue-600 hover:bg-gray-100"
                  } transition-all duration-150`}
                  aria-label={copied ? "Copied" : "Copy Quote ID"}
                >
                  {copied ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75c-.621 0-1.125-.504-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375V17.25m0 0v-3.375m0 3.375h-3.375m3.375 0h3.375"
                      />
                    </svg>
                  )}
                  {/* Tooltip-like text for "Copied!" */}
                  {copied && (
                    <span className="absolute -top-6 text-xs bg-black text-white px-2 py-0.5 rounded-md">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ✅ Only for Invoice: show Quote Amount */}
          {isInvoice && (
            <div className="flex items-center justify-between py-1">
              <span className="text-gray-600">Quote Amount</span>
              <span className="font-medium text-gray-900">
                {data?.invoiceAmount ?? data?.amount ?? "—"}
              </span>
            </div>
          )}
        </div>

        {/* Modal Actions */}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-9 px-4 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={deleting}
            className={`h-9 px-4 rounded-md text-white transition-colors ${
              deleting
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
            aria-busy={deleting}
          >
            {deleting ? (
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-25"
                  />
                  <path
                    d="M4 12a8 8 0 018-8"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="opacity-75"
                  />
                </svg>
                Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Chases = () => {
  const { id } = useParams();
  const type = id;
  const userId = useSelector((state) => state.session.userId);

  const { data, isLoading } = useGetChases(userId?.telegramId, type);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // ✅ NEW: setup delete mutation + loading state
  const { deleteChase, isLoading: isDeleting } = useDeleteChase();

  const openModal = (item) => {
    console.log(item, "selected item");
    setSelected(item);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const handleDelete = () => {
    const idToDelete = selected?._id || selected?.id;
    if (!idToDelete) return;

    deleteChase(
      { id: idToDelete, type, telegramId: userId?.telegramId },
      { onSuccess: () => setOpen(false) }
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className="h-[100dvh] bg-[#D3DCE5] pt-8 px-5 font-sans">
      <IoArrowBack
        size={24}
        className="text-[#5290C1] mb-4"
        onClick={() => window.history.back()}
      />
      <h1 className="text-xl font-semibold text-[#5290C1] mb-1">Chases</h1>

      <p className="text-sm text-[#1B1C1E] font-medium font-poppins my-4">
        Select the {id} you want to chase.
      </p>
      {data?.data?.length > 0 ? (
        <div className="space-y-3 h-[65vh] overflow-y-scroll">
          {data?.data?.map((quote, index) => (
            <div key={index} onClick={() => openModal(quote)}>
              <InfoCard
                image={
                  id === "quote"
                    ? "https://img.icons8.com/external-filled-outline-wichaiwi/64/external-bill-customer-validation-filled-outline-wichaiwi.png"
                    : invoiceImage
                }
                title={id === "quote" ? "Quote" : "Invoice"}
                id={index + 1}
                label1="Customer Name"
                value1={quote?.customerName}
                label2="Quote Amount"
                showStatus={id === "quote" ? true : false}
                status={quote?.isPaid ? "Paid" : "Awaiting Payment"}
                value2={quote?.invoiceAmount}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[65vh] w-[100%] flex justify-center items-center">
          No {id} to Show
        </div>
      )}

      <StatusModal
        open={open}
        onClose={closeModal}
        onDelete={handleDelete}
        data={selected}
        type={type}
        deleting={isDeleting}
      />
    </div>
  );
};

export default Chases;

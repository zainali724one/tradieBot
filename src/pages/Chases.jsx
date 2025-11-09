import React, { useState } from "react";
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
  if (!open) return null;

  const isQuote = type === "quote";
  const isInvoice = type === "invoice";

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-[#1980d4] mb-3">
          {isQuote ? "Quote" : "Invoice"} Details
        </h3>

        <div className="space-y-2 text-sm">
          {/* ✅ Always show Customer Name */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Customer Name</span>
            <span className="font-medium text-gray-900">
              {data?.customerName || "—"}
            </span>
          </div>

          {/* ✅ Only for Invoice: show Quote Amount */}
          {isInvoice && (
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Quote Amount</span>
              <span className="font-medium text-gray-900">
                {data?.invoiceAmount ?? data?.amount ?? "—"}
              </span>
            </div>
          )}
        </div>

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
            className={`h-9 px-4 rounded-md text-white hover:bg-red-700 ${
              deleting
                ? "bg-red-500 cursor-not-allowed opacity-80"
                : "bg-red-600"
            }`}
            aria-busy={deleting}
          >
            {deleting ? (
              <span className="inline-flex items-center">
                <svg
                  className="mr-2 h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
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
    <div className="h-[100dvh] bg-[#D3DCE5] pt-12 px-5 font-sans">
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
                showStatus={true}
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

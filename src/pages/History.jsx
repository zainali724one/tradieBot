import React, { useState } from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import { useGethistory } from "../reactQuery/queries/queries";
import { InfoCard } from "../components/InfoCard";
import { useSelector } from "react-redux";
// ✅ NEW: import the hook
import { useDeleteHistory } from "../reactQuery/mutations/auth";

const StatusModal = ({ open, onClose, onDelete, data, deleting }) => {
  if (!open) return null;
    const [copied, setCopied] = useState(false);
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl">
        <h3 className="text-lg font-semibold text-[#1980d4] mb-3">Details</h3>

        {/* ✅ Only Customer for History */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Customer</span>
            <span className="font-medium text-gray-900">
              {data?.customerName || "—"}
            </span>
          </div>



           <div className="flex items-center justify-between">
            <span className="text-gray-600">Job Description</span>
            <span className="font-medium text-gray-900">
              {data?.jobDescription || "—"}
            </span>
          </div>



            <div className="flex items-center justify-between">
            <span className="text-gray-600">Job Date</span>
            <span className="font-medium text-gray-900">
              {data?.date || "—"}
            </span>
          </div>





           <div className="flex items-center justify-between">
            <span className="text-gray-600">Job Time</span>
            <span className="font-medium text-gray-900">
              {data?.time || "—"}
            </span>
          </div>


              <div className="flex items-center justify-between py-1">
              <span className="text-gray-600">Job ID</span>
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
                  aria-label={copied ? "Copied" : "Copy Job ID"}
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
            className={`h-9 px-4 rounded-md text-white ${
              deleting
                ? "bg-red-500 cursor-not-allowed opacity-80"
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

const History = () => {
  const userId = useSelector((state) => state.session.userId);
  const { data, isLoading } = useGethistory(userId?.telegramId);

  const tg = window?.Telegram?.WebApp;
  tg?.ready();
  const telegramUserData = tg?.initDataUnsafe?.user;

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // ✅ NEW: set up the mutation with loading state
  const { deleteHistory: deleteHistoryMut, isLoading: isDeleting } =
    useDeleteHistory();

  const openModal = (item) => {
    setSelected(item);
    setOpen(true);
  };
  const closeModal = () => setOpen(false);

  const handleDelete = () => {
    // ✅ call the API; handle both `_id` and `id` just in case
    const id = selected?._id || selected?.id;
    if (!id) return;
    deleteHistoryMut(id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  // ✅ Centered loader while fetching
  if (isLoading)
    return (
      <div className="min-h-screen grid place-items-center bg-[#D3DCE5]">
        <div className="flex items-center gap-2 text-[#1980d4]">
          <svg className="h-6 w-6 animate-spin" viewBox="0 0 24 24" fill="none">
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
          <span className="font-medium">Loading…</span>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-12 px-6">
      <UserProfileHeader
        image={telegramUserData?.photo_url}
        name={`${telegramUserData?.first_name ?? ""} ${
          telegramUserData?.last_name ?? ""
        }`}
        subtitle="Welcome"
      />

      <div className="w-full  mb-3">
        <h2 className="text-lg font-semibold text-[#1980d4] mt-4">History</h2>
        <p className="text-sm text-[#1B1C1E] font-medium font-poppins mt-4 mb-2">
          Here are your active jobs.
        </p>
      </div>

      <div className="w-full  space-y-3 h-[60vh] overflow-y-scroll">
        {data?.history?.map((quote, index) => (
          <div key={index} onClick={() => openModal(quote)}>
            <InfoCard
              image={quote?.image || "https://img.icons8.com/ios/50/work.png"}
              index={index + 1}
              label1="Customer"
              value1={quote?.customerName}
              showStatus={true}
              status={quote?.status}
              statusColor={quote?.statusColor}
            />
          </div>
        ))}
      </div>

      <StatusModal
        open={open}
        onClose={closeModal}
        onDelete={handleDelete}
        data={selected}
        deleting={isDeleting} // ✅ NEW
      />
    </div>
  );
};

export default History;

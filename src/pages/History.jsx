import React, { useState } from "react";
import UserProfileHeader from "../components/UserProfileHeader";
import { useGethistory } from "../reactQuery/queries/queries";
import { InfoCard } from "../components/InfoCard";
import { useSelector } from "react-redux";
// ✅ NEW: import the hook
import { useDeleteHistory } from "../reactQuery/mutations/auth";

const StatusModal = ({ open, onClose, onDelete, data, deleting }) => {
  if (!open) return null;
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

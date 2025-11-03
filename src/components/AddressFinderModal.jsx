// components/AddressFinderModal.js
import React, { useState } from "react";
import LabeledInput from "./LabeledInput"; // Re-using your input
import PrimaryButton from "./PrimaryButton";

// --- THIS IS A FAKE API CALL ---
// Replace this with your call to Ideal Postcodes, getaddress.io, etc.
const fakePostcodeLookup = (postcode) => {
  console.log("API: Searching for postcode:", postcode);
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulating a successful API response
      resolve([
        { id: 1, fullAddress: "10 Downing Street, London, SW1A 2AA" },
        { id: 2, fullAddress: "11 Downing Street, London, SW1A 2AA" },
        { id: 3, fullAddress: "12 Downing Street, London, SW1A 2AA" },
      ]);
    }, 1000); // 1-second delay
  });
};
// --- END OF FAKE API ---

const AddressFinderModal = ({ isOpen, onClose, onAddressSelect }) => {
  const [postcode, setPostcode] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleFindAddress = async () => {
    if (!postcode) {
      setError("Please enter a postcode.");
      return;
    }
    setLoading(true);
    setError("");
    setAddresses([]);

    try {
      // *** REPLACE THIS with your real API call ***
      const results = await fakePostcodeLookup(postcode);

      if (results.length === 0) {
        setError("No addresses found for that postcode.");
      } else {
        setAddresses(results);
      }
    } catch (err) {
      setError("Failed to fetch addresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (address) => {
    onAddressSelect(address.fullAddress); // Send the full string back
    // Reset state for next time
    setPostcode("");
    setAddresses([]);
    setError("");
    onClose(); // Close the modal
  };

  return (
    // Simple Modal Background
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
      >
        <h2 className="text-xl font-semibold mb-4">Find Address</h2>
        <LabeledInput
          label="Enter Postcode"
          placeholder="e.g., SW1A 2AA"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          error={error}
        />
        <div className="mt-4">
          <PrimaryButton
            children="Find Address"
            onClick={handleFindAddress}
            loading={loading}
            disabled={loading}
          />
        </div>

        {/* Address List */}
        {addresses.length > 0 && (
          <div className="mt-4 border-t pt-4 max-h-60 overflow-y-auto">
            <p className="font-semibold mb-2">Select an address:</p>
            <ul className="divide-y divide-gray-200">
              {addresses.map((addr) => (
                <li
                  key={addr.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(addr)}
                >
                  {addr.fullAddress}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressFinderModal;

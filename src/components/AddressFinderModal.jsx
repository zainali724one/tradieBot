import React, { useState } from "react";
import LabeledInput from "./LabeledInput"; // Re-using your input
import PrimaryButton from "./PrimaryButton";

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

    // --- Real API Implementation ---

    // WARNING: This API key is visible to anyone using your website.
    // For production, you should move this API call to your backend
    // to protect your key.
    const apiKey = "6ef199aa-1e50-4519-ab10-27aae057a6ac";
    const encodedPostcode = encodeURIComponent(postcode);
    const url = `https://api.simplylookupadmin.co.uk/full_v3/getaddresslist?data_api_Key=${apiKey}&query=${encodedPostcode}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // Handle network-level errors
        throw new Error("API request failed. Please try again later.");
      }

      const data = await response.json();

      // Handle API-level errors (e.g., "Invalid API Key")
      if (data.errormessage) {
        throw new Error(data.errormessage);
      }

      // Handle no results found
      if (!data.results || data.results.length === 0) {
        setError(
          "No addresses found for that postcode. Please check and try again."
        );
        setLoading(false);
        return;
      }

      // Map the API response (data.results) to the format our list expects
      // The API returns: { "results": [{ "Line": "...", "ID": "..." }] }
      const formattedAddresses = data.results.map((addr) => ({
        id: addr.ID,
        fullAddress: addr.Line,
      }));

      setAddresses(formattedAddresses);
    } catch (err) {
      setError(err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
    // --- End of API Implementation ---
  };

  const handleSelect = (address) => {
    onAddressSelect(address.fullAddress); // Send the full address string back

    // Reset modal state for next time
    setPostcode("");
    setAddresses([]);
    setError("");
    onClose(); // Close the modal
  };

  return (
    // Modal Background
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

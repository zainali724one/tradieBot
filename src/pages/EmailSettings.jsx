import React, { useState, useEffect } from "react";
import { Mail, Lock, Server, CheckCircle, AlertCircle } from "lucide-react";
import axiosClient from "../api/auth/axiosClient";
import StripeConnectModal from "../components/StripeConnectModal";
import { useSelector } from "react-redux";

// Pre-defined settings for common providers
const SMTP_PRESETS = {
  outlook: { host: "smtp.office365.com", port: 587 },
  yahoo: { host: "smtp.mail.yahoo.com", port: 465 },
  zoho: { host: "smtp.zoho.com", port: 465 },
};

const EmailSettings = () => {
  const [loading, setLoading] = useState(false);
 const user = useSelector((state) => state.session.userId);
  const [provider, setProvider] = useState(user?.emailProvider || "gmail");
  const [modalOpen, setModalOpen] = useState(false);
 
  // SMTP Form State
  const [formData, setFormData] = useState({
    businessName: user?.businessName || "",
    smtpHost: user?.smtpHost || "",
    smtpPort: user?.smtpPort || 587,
    smtpUser: user?.smtpUser || "",
    smtpPass: "", // Always start empty for security
  });

  // Handle "Quick Fill" selection
  const applyPreset = (presetKey) => {
    if (SMTP_PRESETS[presetKey]) {
      setFormData((prev) => ({
        ...prev,
        smtpHost: SMTP_PRESETS[presetKey].host,
        smtpPort: SMTP_PRESETS[presetKey].port,
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.put("/user/emailSettings", {
        userId: user._id,
        emailProvider: provider,
        ...formData,
      });
      
      if(response.data.success){
        alert("Settings Saved Successfully!");
        // onUpdateUser(response.data.user); 
      }
    }catch(error){
      alert("Failed to save settings");
    } finally{
      setLoading(false);
    }
  };

  const isGoogleConnected = !!user?.googleAccessToken;

  return (
    <div className="max-w-2xl mx-auto bg-[#D3DCE5] p-8 rounded-xl shadow-lg " style={{paddingBottom:"70px"}}>
      
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Email Configuration</h2>
        <p className="text-gray-500 text-sm mt-1">
          Choose how you want to send invoices and quotes to your customers.
        </p>
      </div>

      {/* Business Name Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Business Name (appears in "From" field)</label>
        <input
          type="text"
          value={formData.businessName}
          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          placeholder="e.g. John's Plumbing"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
      </div>

      {/* Provider Selection Tabs */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => setProvider("gmail")}
          className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
            provider === "gmail"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
        >
          <Mail className="w-6 h-6 mb-2" />
          <span className="font-semibold">Gmail / Google Workspace</span>
        </button>

        <button
          onClick={() => setProvider("smtp")}
          className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
            provider === "smtp"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
        >
          <Server className="w-6 h-6 mb-2" />
          <span className="font-semibold">Other Provider (SMTP)</span>
        </button>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        
        {/* OPTION 1: GMAIL VIEW */}
        {provider === "gmail" && (
          <div className="text-center py-4">
            {isGoogleConnected ? (
              <div className="flex flex-col items-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Account Connected</h3>
                <p className="text-gray-500 text-sm mt-1 mb-4">
                  Emails will be sent securely via your Google Account.
                </p>
                <div className="bg-white px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-600">
                  {user.email}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800">Action Required</h3>
                <p className="text-gray-500 text-sm mt-1 mb-6 max-w-xs">
                  To send emails via Gmail, you must connect your Google Account.
                </p>
                <button
                  onClick={openGoogleModal} // <--- Opens your existing modal
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors"
                >
                  Connect Google Account
                </button>
              </div>
            )}
          </div>
        )}

        {/* OPTION 2: SMTP FORM */}
        {provider === "smtp" && (
          <div className="animate-fade-in">
            {/* Quick Fill Buttons */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider py-1">Quick Fill:</span>
              {['outlook', 'yahoo', 'zoho'].map((p) => (
                <button
                  key={p}
                  onClick={() => applyPreset(p)}
                  className="px-3 py-1 text-xs bg-white border border-gray-300 rounded-full hover:bg-gray-100 text-gray-700 capitalize"
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">SMTP Host</label>
                <input
                  type="text"
                  placeholder="smtp.example.com"
                  value={formData.smtpHost}
                  onChange={(e) => setFormData({ ...formData, smtpHost: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Port</label>
                <input
                  type="number"
                  placeholder="587"
                  value={formData.smtpPort}
                  onChange={(e) => setFormData({ ...formData, smtpPort: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-gray-500 mb-1">Email / Username</label>
                <input
                  type="email"
                  placeholder="info@yourdomain.com"
                  value={formData.smtpUser}
                  onChange={(e) => setFormData({ ...formData, smtpUser: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded bg-white text-sm"
                />
              </div>
              <div className="md:col-span-2 relative">
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  App Password 
                  <span className="ml-2 text-xs text-gray-400 font-normal">(Leave blank to keep unchanged)</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={formData.smtpPass}
                    onChange={(e) => setFormData({ ...formData, smtpPass: e.target.value })}
                    className="w-full pl-9 p-2 border border-gray-300 rounded bg-white text-sm"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">
                  Use an App Password, not your login password.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={loading || (provider === 'gmail' && !isGoogleConnected)}
          className={`px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all ${
            loading || (provider === 'gmail' && !isGoogleConnected)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#5290C1] hover:bg-[#1980d4]"
          }`}
        >
          {loading ? "Saving..." : "Save Configuration"}
        </button>
      </div>

       <StripeConnectModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={user?._id}
      />
    </div>
  );
};

export default EmailSettings;
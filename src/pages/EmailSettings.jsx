import React, { useState } from "react";
import { Mail, Lock, Server, CheckCircle, ShieldCheck } from "lucide-react";
import axiosClient from "../api/auth/axiosClient";
// Removed StripeConnectModal if it is no longer needed for this specific email flow
import { useSelector } from "react-redux";

// Pre-defined settings for common providers
const SMTP_PRESETS = {
  outlook: { host: "smtp.office365.com", port: 587 },
  yahoo: { host: "smtp.mail.yahoo.com", port: 465 },
  zoho: { host: "smtp.zoho.com", port: 465 },
};

const EmailSettings = () => {
  // Move useSelector to the top level
  const user = useSelector((state) => state.session.userId);
  
  const [loading, setLoading] = useState(false);
  
  // Default to "platform" if no provider is set
  // Note: If user previously had 'gmail', this will default to 'platform' unless you map it
  const [provider, setProvider] = useState(
    user?.emailProvider === "smtp" ? "smtp" : "platform"
  );

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
    if (provider === "smtp") {
      // Basic validation for SMTP fields
      if (!formData.smtpHost || !formData.smtpPort || !formData.smtpUser || !formData.smtpPass) {
        alert("Please fill in all SMTP fields.");
        setLoading(false);
        return;
      }
    }

    try {
      const response = await axiosClient.put("/user/emailSettings", {
        userId: user._id,
        emailProvider: provider,
        ...formData,
      });
      
      if (response.data.success) {
        alert("Settings Saved Successfully!");
      }
    } catch (error) {
      alert("Failed to save settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[#D3DCE5] p-8 rounded-xl shadow-lg" style={{ paddingBottom: "70px" }}>
      
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
        {/* Option 1: Platform Email */}
        <button
          onClick={() => setProvider("platform")}
          className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
            provider === "platform"
              ? "border-blue-500 bg-blue-50 text-blue-700"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
        >
          {/* Changed Icon to ShieldCheck to represent trusted platform */}
          <ShieldCheck className="w-6 h-6 mb-2" />
          <span className="font-semibold">Default Platform Email</span>
        </button>

        {/* Option 2: Custom SMTP */}
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
        
        {/* OPTION 1: PLATFORM VIEW (Replaces Gmail View) */}
        {provider === "platform" && (
          <div className="text-center py-6 animate-fade-in">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">You are all set!</h3>
            <p className="text-gray-500 text-sm mt-2 max-w-sm mx-auto">
              Emails will be sent using the default UK Tradie Bot mail server. No account connection or extra configuration is required.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200">
              <CheckCircle className="w-3 h-3" />
              Service Active
            </div>
          </div>
        )}

        {/* OPTION 2: SMTP FORM (Unchanged) */}
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
          disabled={loading} // Removed the googleConnected check
          className={`px-8 py-3 rounded-lg font-bold text-white shadow-md transition-all ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#5290C1] hover:bg-[#1980d4]"
          }`}
        >
          {loading ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </div>
  );
};

export default EmailSettings;
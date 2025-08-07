import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const XeroConnected = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          {/* <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Xero_software_logo.svg"
            alt="Xero Logo"
            className="h-12"
          /> */}
          <img width="70" height="70" src="https://img.icons8.com/external-tal-revivo-bold-tal-revivo/96/external-xero-is-a-new-zealand-public-technology-company-logo-bold-tal-revivo.png" alt="external-xero-is-a-new-zealand-public-technology-company-logo-bold-tal-revivo"/>
        </div>

        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">Xero Connected!</h1>
        <p className="text-gray-600 mb-6">
          Your Xero account is now successfully connected to your app.
        </p>

        {/* <a
          href="/dashboard"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </a> */}
      </div>
    </div>
  );
};

export default XeroConnected;

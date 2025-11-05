import React from "react";
import { handleOpenExternalLink } from "../services";

const ConnectGoogleButton = ({ userId, onClose }) => {
  const handleConnect = () => {
    const redirectUrl = `https://tradie-bot-backend-three.vercel.app/api/user/connect/${userId}`;
    handleOpenExternalLink(redirectUrl);
    onClose();
    // window.open(redirectUrl, "_blank");
  };

  return (
    <button
      onClick={handleConnect}
      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded shadow"
    >
      Connect Google
    </button>
  );
};

export default ConnectGoogleButton;

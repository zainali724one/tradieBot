import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleOpenExternalLink } from "../services";

const ConnectXeroButton = ({ userId, onClose }) => {
  const [authUrl, setAuthUrl] = useState("");

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
        const res = await axios.post(
          `https://tradie-bot-backend-three.vercel.app/api/xero/consentUrl`,
          {
            userId: userId,
          }
        );
        setAuthUrl(res.data.url);
      } catch (error) {
        console.log("Error fetching Xero auth URL:", error);
      }
    };
    fetchAuthUrl();
  }, []);

  return (
    <>
      {" "}
      {authUrl && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => {
            handleOpenExternalLink(authUrl), onClose();
          }}
        >
          Connect to Xero
        </button>
      )}
    </>

    // {authUrl}
  );
};

export default ConnectXeroButton;

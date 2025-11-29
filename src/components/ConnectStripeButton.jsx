import React from "react";
// import { handleOpenExternalLink } from "../services";

const ConnectStripeButton = ({ userId, onClose }) => {
  const handleConnect = () => {
    const clientId = "ca_SyqoD4zwYXEG5GXruZBjMcZJ85VDVEbA";
    const redirectUri = encodeURIComponent(
      "https://tradie-bot-backend-three.vercel.app/api/stripe/oauth/callback"
    );
    const stripeConnectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&redirect_uri=${redirectUri}&state=${userId}`;
    // handleOpenExternalLink(stripeConnectUrl)

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.openLink(stripeConnectUrl, {
        try_instant_view: false,
      });
      onClose();
    } else {
      window.location.href = stripeConnectUrl;
    }
  };

  return (
    <button
      onClick={handleConnect}
      style={{
        padding: "10px 20px",
        backgroundColor: "#635bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Connect with Stripe
    </button>
  );
};

export default ConnectStripeButton;

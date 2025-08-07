import React from "react";
import { handleOpenExternalLink } from "../services";

const ConnectStripeButton = ({ userId }) => {
  const handleConnect = () => {
    const clientId = "ca_SV2gwQIeJObVhI9gCifckP6eIlpbQQZa";
    const redirectUri = encodeURIComponent(
      "https://tradie-bot-backend.vercel.app/api/stripe/oauth/callback"
    );
    const stripeConnectUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&redirect_uri=${redirectUri}&state=${userId}`;
handleOpenExternalLink(stripeConnectUrl)

    // if (window.Telegram && window.Telegram.WebApp) {
    //   window.Telegram.WebApp.openLink(stripeConnectUrl, {
    //     try_instant_view: false,
    //   });
    // } else {

    //   window.location.href = stripeConnectUrl;
    // }
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

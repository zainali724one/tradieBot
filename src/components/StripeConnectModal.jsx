import React, { useEffect, useState } from "react";
import ConnectStripeButton from "./ConnectStripeButton";
import ConnectGoogleButton from "./ConnectGoogleButton"; // create this similarly
import ConnectXeroButton from "./ConnectXeroButton";
import { Getuser } from "../api/auth/auth";

const StripeConnectModal = ({
  isOpen,
  onClose,
  userId,
  isStripeConnected,
  isGoogleConnected,
  isXeroConnected,
}) => {
  if (!isOpen) return null;
  const [userData,setUserData]=useState({})
 const returnUserData = async (telegramId) => {
         // 8141119319
     
         Getuser(telegramId)
           .then((res) => {
     setUserData(res?.user)
            
             console.log(res, "data is added");
           })
           .catch((err) => {
             // localStorage.removeItem("telegramid");
             // nevigate("/signin");
             console.log(err, "here is the error");
           });
         // return theUser;
       };
   
        const tg = window?.Telegram?.WebApp;
         console.log(tg.initDataUnsafe.user, "here is user");
         // const telegramUserData = tg.initDataUnsafe.user;
       
         tg?.ready();
         useEffect(() => {
           if (tg?.initDataUnsafe?.user?.id) {
             const userId = tg.initDataUnsafe.user.id;
             returnUserData(userId);
           }
         }, [tg?.initDataUnsafe?.user?.id]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-4">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">
          Connect Your Accounts
        </h2>

        <div className="space-y-6">
          {/* Stripe Section */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Stripe</span>
            
            {userData?.stripeAccountId ? (
              <span className="text-green-600 font-semibold">✅ Connected</span>
            ) : (
              <ConnectStripeButton userId={userId} />
            )}
          </div>

          {/* Google Section */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Google</span>
         
          
            {userData?.googleRefreshToken && userData?.googleAccessToken ? (
              <span className="text-green-600 font-semibold">✅ Connected</span>
            ) : (
              <ConnectGoogleButton userId={userId} />
            )}
          </div>


          <div className="flex items-center justify-between">
            <span className="font-medium">Xero</span>

                     
         
            {userData?.xeroToken &&
      userData?.tenantId ? (
              <span className="text-green-600 font-semibold">✅ Connected</span>
            ) : (
              <ConnectXeroButton userId={userId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeConnectModal;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleOpenExternalLink } from "../services";

const ConnectXeroButton = ({userId}) => {
  const [authUrl, setAuthUrl] = useState("");

  useEffect(() => {
    const fetchAuthUrl = async () => {
      try {
          const res = await axios.get(`https://tradie-bot-backend.vercel.app/api/xero/consetUrl`, {
        params: {
       userId:userId
        }
      });
      setAuthUrl(res.data.url); 
      } catch (error) {
        console.log("Error fetching Xero auth URL:", error);
        
      }
   
    };
    fetchAuthUrl();
  }, []);

  return (

    <>   {authUrl && <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={()=>handleOpenExternalLink(authUrl)}>
      Connect to Xero
    </button>}
    </>

      // {authUrl}
  
  );
};

export default ConnectXeroButton;

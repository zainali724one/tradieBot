import { FaQuoteLeft } from "react-icons/fa";
import {
  FiClock,
  FiBell,
  FiFileText,
  FiCalendar,
  FiMessageSquare,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import i6 from "../../assets/icons/i6.png";
import i7 from "../../assets/icons/i7.png";
import i8 from "../../assets/icons/i8.png";
import i9 from "../../assets/icons/i9.png";
import i10 from "../../assets/icons/i10.png";
import i11 from "../../assets/icons/i11.png";
import i12 from "../../assets/icons/i12.png";
import i13 from "../../assets/icons/i13.png";
import Image from "../../components/ui/Image";
import { isCurrentPage } from "../../services";
const Footer = () => {
  const navigate = useNavigate();

  const currentRoute = window.location.pathname;



  return (
    <div className="fixed bottom-0  w-full bg-white shadow-md rounded-t-3xl px-4 py-2 flex justify-between items-center max-w-[430px] mx-auto">
      {/* Quote */}
      <div
        className="flex flex-col items-center"
        onClick={() => navigate("/quoteform")}
      >
        <Image
          src={isCurrentPage("/quoteform", currentRoute) ? i10 : i6}
          className="h-[20px] w-[20px]"
        />
        <span
          className={`text-xs mt-1 ${
            isCurrentPage("/quoteform", currentRoute)
              ? "text-[#5290C1]"
              : "text-[#1E1E1E80]"
          }`}
        >
          Quote
        </span>
      </div>
      {/* Invoice */}
      <div className="flex flex-col items-center text-gray-500"
           onClick={() => navigate("/invoice")}
      >
        {/* <FiFileText size={20} /> */}
        <Image
          src={isCurrentPage("/invoice", currentRoute) ? i11 : i7}
          className="h-[18px] w-[14px]"
        />
        <span
          className={`text-xs mt-1 ${
            isCurrentPage("/invoice", currentRoute)
              ? "text-[#5290C1]"
              : "text-[#1E1E1E80]"
          }`}
     
        >
          Invoice
        </span>
      </div>
      {/* Center Icon */}

      {/* <div className="flex flex-col items-center -mt-10">
        <div
                  onClick={() => navigate("/schedule")}

        
        className="w-17 h-17 rounded-full bg-[#1980d4] border-[8px] border-[#D3DCE5] flex items-center justify-center flex-col shadow-md">
          <FiCalendar size={15} className="text-white" />
         <p className="text-white text-[7px] mt-1">Schedule Job</p>
        </div>
         
      </div> */}


      <div className="flex flex-col items-center -mt-10">
        <div
          onClick={() => navigate("/schedule")}
          /* 1. Text removed from inside here. 
             2. Icon size increased. 
             3. border-white used to blend with footer (optional) */
          className="w-16 h-16 rounded-full bg-[#1980d4] border-[6px] border-white flex items-center justify-center shadow-lg"
        >
          <FiCalendar size={24} className="text-white" />
        </div>
        
        {/* Text is now OUTSIDE the blue button */}
        <span className="text-xs mt-2 text-[#5290C1] font-medium">
          Schedule
        </span>
      </div>
      {/* Chase */}
      <div
        className="flex flex-col items-center text-gray-500"
        onClick={() => navigate("/chase")}
      >
        {/* <FiBell size={20} /> */}
        <Image
          src={isCurrentPage("/chase", currentRoute) ? i12 : i8}
          className="h-[18px] w-[17px]"
        />
        <span
          className={`text-xs mt-1 ${
            isCurrentPage("/chase", currentRoute)
              ? "text-[#5290C1]"
              : "text-[#1E1E1E80]"
          }`}
        >
          Chase
        </span>
      </div>
      {/* History */}
      <div
        className="flex flex-col items-center text-gray-500"
        onClick={() => navigate("/history")}
      >
        {/* <FiClock size={20} /> */}
        <Image
          src={isCurrentPage("/history", currentRoute) ? i13 : i9}
          className="h-[16px] w-[16px]"
        />
        <span
          className={`text-xs mt-1 ${
            isCurrentPage("/history", currentRoute)
              ? "text-[#5290C1]"
              : "text-[#1E1E1E80]"
          }`}
        >
      Jobs
        </span>
      </div>
    </div>
  );
};

export default Footer;

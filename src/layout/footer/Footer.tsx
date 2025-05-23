import { FaQuoteLeft } from "react-icons/fa";
import {
  FiClock,
  FiBell,
  FiFileText,
  FiCalendar,
  FiMessageSquare,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0  w-full bg-white shadow-md rounded-t-3xl px-4 py-2 flex justify-between items-center max-w-[430px] mx-auto">
      {/* Quote */}
      <div className="flex flex-col items-center text-[#1980d4]">
        <FaQuoteLeft size={20} />
        <span className="text-xs mt-1">Quote</span>
      </div>
      {/* Invoice */}
      <div className="flex flex-col items-center text-gray-500">
        <FiFileText size={20} />
        <span className="text-xs mt-1">Invoice</span>
      </div>
      {/* Center Icon */}

      <div className="flex flex-col items-center -mt-10">
        <div className="w-16 h-16 rounded-full bg-[#1980d4] border-[8px] border-[#D3DCE5] flex items-center justify-center shadow-md">
          <FiCalendar size={22} className="text-white" />
        </div>
      </div>
      {/* Chase */}
      <div
        className="flex flex-col items-center text-gray-500"
        onClick={() => navigate("/chase")}
      >
        <FiBell size={20} />
        <span className="text-xs mt-1">Chase</span>
      </div>
      {/* History */}
      <div
        className="flex flex-col items-center text-gray-500"
        onClick={() => navigate("/history")}
      >
        <FiClock size={20} />
        <span className="text-xs mt-1">History</span>
      </div>
    </div>
  );
};

export default Footer;

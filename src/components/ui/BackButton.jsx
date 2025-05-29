import { useNavigate } from "react-router-dom";
import arrowback from "../../assets/icons/arrow_back.png";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="flex items-center cursor-pointer">
      <img src={arrowback} alt="Back" className="w-5 h-5" />
    </button>
  );
};

export default BackButton;

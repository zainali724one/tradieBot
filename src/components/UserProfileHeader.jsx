import { useNavigate } from "react-router-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";

const UserProfileHeader = ({ image, name, subtitle }) => {
  const navigate = useNavigate();

  const handelchange = () => {
    navigate("/profile");
  };
  return (
    <div
      className="flex items-center justify-between gap-3 w-full cursor-pointer"
      
    >

      <div className="flex items-center">
      <div className="w-11 h-11 rounded-full overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt={name} />
      </div>
      <div>
        <div className="text-base font-semibold text-[#1B1C1E] font-poppins">
          {name}
        </div>
        <div className="text-sm font-medium text-[#1B1C1E] opacity-60 font-poppins">
          {subtitle}
        </div>

      </div>
      </div>
<HiOutlineDotsVertical onClick={handelchange} className="text-xl"/>
    </div>
  );
};

export default UserProfileHeader;

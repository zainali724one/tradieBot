import arrowforward from "../assets/icons/arrowforward.png";

const SettingTab = ({ title, icon, showNextIcon = true, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between items-center rounded-xl px-4 py-4 cursor-pointer"
      style={{
        boxShadow: "inset 0 0 10px rgba(82, 144, 193, 0.2)",
        backgroundColor: "transparent",
      }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      {showNextIcon && (
        <img
          src={arrowforward}
          alt="Next"
          style={{
            width: 10,
            height: 10,
            marginLeft: 8,
            verticalAlign: "middle",
          }}
        />
      )}
    </div>
  );
};

export default SettingTab;
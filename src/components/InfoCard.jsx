import { Avatar } from "antd";

export const InfoCard = ({
  image,
  title,
  id,
  label1,
  value1,
  label2,
  value2,
  label3,
  value3,
  showStatus = false,
  status,
}) => {
  const statusColorMap = {
    Scheduled: "#FF9500",
    Completed: "#18721E80",
    "Awaiting Payment": "#E81E1E80",
  };

  const backgroundColor = statusColorMap[status] || "#ccc";
  return (
    <div
      className="flex items-center gap-4 rounded-xl px-4 py-3"
      style={{ boxShadow: "inset 0 0 10px rgba(82, 144, 193, 0.2)" }}
    >
      {image && (
        <img
          src={image}
          alt="Avatar"
          className="w-12 h-12  object-contain"
        />
        // <Avatar src={image} alt="Avatar" size="large" />
      )}

      <div className="flex flex-col">
        {title && id && (
          <p className="font-bold text-sm text-black">
            {title} {id}
          </p>
        )}

        {label1 && value1 && (
          <p className="text-xs text-gray-700">
            <span className="font-semibold">{label1}:</span> {value1}
          </p>
        )}

        {label2 && value2 && (
          <p className="text-xs text-gray-700">
            <span className="font-semibold">{label2}:</span> {value2}
          </p>
        )}

        {label3 && value3 && (
          <p className="text-xs text-gray-700">
            <span className="font-semibold">{label3}:</span> {value3}
          </p>
        )}

        {showStatus && status && (
          <p className="text-xs text-gray-700 flex gap-1 mt-2">
            <span className="font-semibold">Status:</span>
            <span
              className="text-xs px-2 py-0.5 rounded-md text-white"
              style={{ backgroundColor }}
            >
              {status}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

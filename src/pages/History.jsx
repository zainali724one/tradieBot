import { InfoCard } from "../components/InfoCard";
import UserProfileHeader from "../components/UserProfileHeader";

const jobs = [
  {
    id: "#A102",
    name: "Jane Smith",
    status: "Scheduled",
    statusColor: "#FF950080",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#A102",
    name: "Jane Smith",
    status: "Completed",
    statusColor: "#18721E80",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#A102",
    name: "Jane Smith",
    status: "Awaiting Payment",
    statusColor: "#E81E1E80",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#A102",
    name: "Jane Smith",
    status: "Scheduled",
    statusColor: "#FF9500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#A102",
    name: "Jane Smith",
    status: "Completed",
    statusColor: "#18721E80",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#A102",
    name: "Jane Smith",
    status: "Awaiting Payment",
    statusColor: "#E81E1E80",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#A102",
    name: "Jane Smith",
    status: "Scheduled",
    statusColor: "#FF9500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
];

const History = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-12 px-5 font-sans">
      <UserProfileHeader
        image="https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
        name="Mr. Thomas John"
        subtitle="Welcome"
      />

      <div className="w-full max-w-[335px] mb-3">
        <h2 className="text-lg font-semibold text-[#1980d4] mt-4">History</h2>
        <p className="text-sm text-[#1B1C1E] font-medium font-poppins mt-4 mb-2">
          Here are your active jobs.
        </p>
      </div>

      <div className="w-full  space-y-3 h-[60vh] overflow-y-scroll">
        {jobs.map((job, index) => (
          <InfoCard
            key={index}
            image={job?.image}
            title="Job ID:"
            id={job?.id}
            label1="Customer"
            value1={job?.name}
            showStatus={true}
            status={job?.status}
            statusColor={job?.statusColor}
          />
        ))}
      </div>
    </div>
  );
};

export default History;

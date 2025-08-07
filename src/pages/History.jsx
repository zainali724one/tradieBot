import UserProfileHeader from "../components/UserProfileHeader";
import { useGethistory } from "../reactQuery/queries/queries";
import { InfoCard } from "../components/InfoCard";
import { useSelector } from "react-redux";

const History = () => {
  const userId = useSelector((state) => state.session.userId);
  const { data, isLoading } = useGethistory(userId?.telegramId);

    const tg = window?.Telegram?.WebApp;

  tg?.ready();

  const telegramUserData = tg.initDataUnsafe.user;

  if (isLoading) {
    return <isLoading />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#D3DCE5] pt-12 px-6">
      <UserProfileHeader
   image={telegramUserData?.photo_url}
        name={telegramUserData?.first_name + " " + telegramUserData?.last_name}
        subtitle="Welcome"
      />

      <div className="w-full  mb-3">
        <h2 className="text-lg font-semibold text-[#1980d4] mt-4">History</h2>
        <p className="text-sm text-[#1B1C1E] font-medium font-poppins mt-4 mb-2">
          Here are your active jobs.
        </p>
      </div>

      <div className="w-full  space-y-3 h-[60vh] overflow-y-scroll">
        {data?.history?.map((quote, index) => (
          <InfoCard
            image={
              quote?.image ||
              "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
            }
            index={index + 1}
            label1="Customer"
            value1={quote?.customerName}
            showStatus={true}
            status={quote?.status}
            statusColor={quote?.statusColor}
          />
        ))}
      </div>
    </div>
  );
};

export default History;

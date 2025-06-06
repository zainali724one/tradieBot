import { useGetChases } from "../reactQuery/queries/queries";
import { InfoCard } from "../components/InfoCard";
import { IoArrowBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";

const Chases = () => {
  const { id } = useParams();
  const type = id;
  const userId = useSelector((state) => state.session.userId);

  const { data, isLoading } = useGetChases(userId?.telegramId, type);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="h-[100dvh] bg-[#D3DCE5] pt-12 px-5 font-sans">
      <IoArrowBack
        size={24}
        className="text-[#5290C1] mb-4"
        onClick={() => window.history.back()}
      />
      <h1 className="text-xl font-semibold text-[#5290C1] mb-1">Chases</h1>

      <p className="text-sm text-[#1B1C1E] font-medium font-poppins my-4">
        Select the {id} you want to chase.
      </p>
      <div className="space-y-3 h-[65vh] overflow-y-scroll">
        {data?.data?.map((quote, index) => (
          <InfoCard
            key={index}
            image={
              quote?.image ||
              "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png"
            }
            title={id === "quote" ? "Quote" : "Invoice"}
            id={index + 1}
            label1="Customer Name"
            value1={quote?.customerName}
            label2="Quote Amount"
            value2={quote?.invoiceAmount}
          />
        ))}
      </div>
    </div>
  );
};

export default Chases;

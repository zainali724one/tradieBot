import { IoArrowBack } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { InfoCard } from "../components/InfoCard";

const quotes = [
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
  {
    id: "#12",
    name: "Jane Smith",
    amount: "$1,500",
    image: "https://c.animaapp.com/maz6qvpnPrz5RU/img/ellipse-8.png",
  },
];

const Chases = () => {
  const { id } = useParams();

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
        {quotes.map((quote, index) => (
          <InfoCard
            key={index}
            image={quote?.image}
            title={id === "quote" ? "Quote" : "Invoice"}
            id={quote?.id}
            label1="Customer Name"
            value1={quote?.name}
            label2="Quote Amount"
            value2={quote?.amount}
          />
        ))}
      </div>
    </div>
  );
};

export default Chases;

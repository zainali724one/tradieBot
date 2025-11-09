import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// console.log(
//   "import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY",
//   import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
// );

console.log("stripePromise", stripePromise);

function CheckoutForm({ clientSecret, quoteAmount, customerName }) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Processing...");

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    if (error) {
      setStatus(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      setStatus("✅ Payment successful!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[430px] w-[90%] mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-5"
    >
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Pay for Quote</h2>
        <p className="text-gray-600 mt-1">
          Customer: <span className="font-medium">{customerName}</span>
        </p>
        <p className="text-gray-600">
          Total: <span className="font-medium">£{quoteAmount}</span>
        </p>
      </div>

      <div className="p-3 border border-gray-300 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
      >
        Pay
      </button>

      {status && <p className="text-sm text-center text-gray-700">{status}</p>}
    </form>
  );
}

export default function QuotePaymentPage() {
  const { quoteId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  console.log("quoteId", quoteId);
  useEffect(() => {
    fetch(
      `https://tradie-bot-backend-three.vercel.app/api/stripe/quote-payment/${quoteId}`
    )
      .then((res) => res.json())
      .then(setPaymentData);
  }, [quoteId]);

  if (!paymentData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Elements stripe={stripePromise}>
        <CheckoutForm {...paymentData} />
      </Elements>
    </div>
  );
}

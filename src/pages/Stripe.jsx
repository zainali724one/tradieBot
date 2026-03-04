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

function CheckoutForm({
  clientSecret,
  quoteAmount,
  customerName,
  quoteId,
  description,
  createdAt,
  businessName,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      }
    );

    setIsProcessing(false);

    if (error) {
      setStatus(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      setStatus("success");
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="max-w-[480px] w-[90%] mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Secure payment
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Complete your invoice payment below
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Order summary */}
        <div className="px-6 py-5 bg-gray-50 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Order summary
          </h2>
          <dl className="space-y-3">
            {quoteId && (
              <div className="flex justify-between items-center">
                <dt className="text-gray-600 text-sm">Reference</dt>
                <dd className="text-gray-900 font-mono text-sm">#{quoteId}</dd>
              </div>
            )}
            <div className="flex justify-between items-center">
              <dt className="text-gray-600 text-sm">Customer</dt>
              <dd className="text-gray-900 font-medium">{customerName}</dd>
            </div>
            {description && (
              <div className="flex justify-between items-start gap-2">
                <dt className="text-gray-600 text-sm shrink-0">Description</dt>
                <dd className="text-gray-700 text-sm text-right">{description}</dd>
              </div>
            )}
            {createdAt && (
              <div className="flex justify-between items-center">
                <dt className="text-gray-600 text-sm">Date</dt>
                <dd className="text-gray-700 text-sm">{formatDate(createdAt)}</dd>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <dt className="text-gray-700 font-semibold">Total due</dt>
              <dd className="text-xl font-bold text-gray-900">
                £{Number(quoteAmount).toFixed(2)}
              </dd>
            </div>
          </dl>
        </div>

        {/* Payment form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card details
            </label>
            <div className="p-4 border border-gray-200 rounded-xl bg-white focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#1f2937",
                      "::placeholder": { color: "#9ca3af" },
                    },
                    invalid: { color: "#dc2626" },
                  },
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-4 rounded-xl transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing…" : `Pay £${Number(quoteAmount).toFixed(2)}`}
          </button>

          {status === "success" && (
            <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-center">
              <p className="text-green-800 font-medium">Payment successful</p>
              <p className="text-green-600 text-sm mt-1">
                Thank you. Your payment has been received.
              </p>
            </div>
          )}
          {status && status !== "success" && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-red-800 text-sm">{status}</p>
            </div>
          )}
        </form>
      </div>

      {/* Trust / security */}
      <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
        <svg
          className="w-4 h-4 shrink-0 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Payments are secure and encrypted</span>
      </div>

      {businessName && (
        <p className="mt-4 text-center text-gray-400 text-xs">
          Payment to {businessName}
        </p>
      )}
    </div>
  );
}

export default function QuotePaymentPage() {
  const { quoteId } = useParams();
  const [paymentData, setPaymentData] = useState(null);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    setLoadError(null);
    fetch(
      `https://tradie-bot-backend-three.vercel.app/api/stripe/quote-payment/${quoteId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Could not load payment details");
        return res.json();
      })
      .then(setPaymentData)
      .catch((err) => setLoadError(err.message));
  }, [quoteId]);

  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-md text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Something went wrong</h2>
          <p className="text-gray-600 mt-2">{loadError}</p>
        </div>
      </div>
    );
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-[480px] w-[90%] mx-auto">
          <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto mb-6" />
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 bg-gray-50 border-b border-gray-100 space-y-3">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mt-4" />
            </div>
            <div className="p-6 space-y-4">
              <div className="h-24 bg-gray-100 rounded-xl animate-pulse" />
              <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4 py-10">
      <Elements stripe={stripePromise}>
        <CheckoutForm quoteId={quoteId} {...paymentData} />
      </Elements>
    </div>
  );
}

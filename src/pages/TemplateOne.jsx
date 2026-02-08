// const TemplateOne = ({data}) => {
//   return (
//     <div 
//       className="w-[430px] p-6 mt-3 bg-white rounded-md shadow-xl font-sans text-sm"
//       style={{ color: '#1e293b' }} 
//     >
//       <div className="flex justify-between items-center mb-6">
//         {data?.companyLogo && <img src={data?.companyLogo} alt="Company Logo" className="max-h-16 max-w-[130px] object-contain" />}
//         <div className="text-right">
//           <h2 
//             className="text-xl font-bold uppercase" 
//             style={{ color: '#374151' }} // Replaces text-gray-700
//           >
//             {data?.type === 'quote' ? 'Quote' : 'Invoice'}
//           </h2>
//           <p 
//             className="text-xs" 
//             style={{ color: '#6b7280' }} // Replaces text-gray-500
//           >
//             {new Date().toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       <div className="space-y-3">
//         <h3 
//           className="text-lg font-semibold" 
//           style={{ color: '#374151' }} // Replaces text-gray-700
//         >
//           {data?.type === 'quote' ? 'Quote Summary' : 'Invoice Summary'}
//         </h3>
//         <p><span className="font-medium">Customer Name:</span> {data?.customerName}</p>
//         <p><span className="font-medium">Job Description:</span> {data?.jobDescription}</p>
//         <p><span className="font-medium">Amount:</span> £{data?.amount}</p>
//         {data?.address && <p><span className="font-medium">Address:</span> {data?.address}</p>}
//         <p><span className="font-medium">Email:</span> {data?.customerEmail}</p>
//         <p><span className="font-medium">Phone:</span> {data?.customerPhone}</p>
//       </div>

//       <div 
//         className="mt-6 border-t pt-4 text-xs text-center"
//         style={{ color: '#9ca3af' }} // Replaces text-gray-400
//       >
//         {data?.type === 'quote' ? 'We hope to hear from you soon' : 'Thank you for choosing our service.'}
       
//       </div>
//     </div>
//   );
// };

// export default TemplateOne;







import React from 'react';

const TemplateOne = ({data}) => {
  // Helper to determine if this is a receipt
  const isReceipt = data?.type?.toLowerCase() === 'receipt';
  const isInvoice = data?.type?.toLowerCase() === 'invoice';
  const isQuote = data?.type?.toLowerCase() === 'quote';

  // Determine Title
  const title = isQuote ? 'Quote' : (isReceipt ? 'Receipt' : 'Invoice');

  return (
    <div 
      className="w-[430px] p-6 mt-3 bg-white rounded-md shadow-xl font-sans text-sm relative overflow-hidden" // Added relative/overflow-hidden for stamp
      style={{ color: '#1e293b' }} 
    >
      {/* --- PAID STAMP (Only for Receipt) --- */}
      {/* {isReceipt && (
        <div className="absolute top-12 right-12 border-4 border-green-600 text-green-600 font-bold text-xl px-4 py-1 -rotate-12 opacity-30 pointer-events-none select-none">
          PAID
        </div>
      )} */}

      <div className="flex justify-between items-center mb-6">
        {data?.companyLogo && <img src={data?.companyLogo} alt="Company Logo" className="max-h-16 max-w-[130px] object-contain" />}
        <div className="text-right">
          <h2 
            className="text-xl font-bold uppercase" 
            style={{ color: '#374151' }} 
          >
            {title}
          </h2>
          <p 
            className="text-xs" 
            style={{ color: '#6b7280' }} 
          >
            {/* If receipt, use today's date or payment date */}
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 
          className="text-lg font-semibold" 
          style={{ color: '#374151' }} 
        >
          {title} Summary
        </h3>
        <p><span className="font-medium">Customer Name:</span> {data?.customerName}</p>
        <p><span className="font-medium">Job Description:</span> {data?.jobDescription}</p>
        
        {data?.address && <p><span className="font-medium">Address:</span> {data?.address}</p>}
        <p><span className="font-medium">Email:</span> {data?.customerEmail}</p>
        <p><span className="font-medium">Phone:</span> {data?.customerPhone}</p>

        {/* --- FINANCIAL BREAKDOWN --- */}
        <div className="mt-4 border-t pt-2">


                { data?.includeCost === "Yes" && <p className="flex justify-between text-base">
                <span className="font-medium">Material Cost:</span> 
                <span>£{data?.materialCost}</span>
            </p>
}
            <p className="flex justify-between text-base">
                <span className="font-medium">Total Amount:</span> 
                <span>£{data?.amount}</span>
            </p>
            
            {/* Show Paid/Balance logic only for Receipt */}
            {isReceipt && (
                <>
                    <p className="flex justify-between text-green-600">
                        <span className="font-medium">Total Cost:</span> 
                        <span>£{data?.materialCost}</span>
                    </p>
                    <p className="flex justify-between font-bold text-lg mt-1 border-t border-gray-100 pt-1">
                        <span className="font-medium">Profit:</span> 
                        <span>£{data?.amount - (data?.materialCost || 0)}</span>
                    </p>
                </>
            )}
        </div>
      </div>

      <div 
        className="mt-6 border-t pt-4 text-xs text-center"
        style={{ color: '#9ca3af' }} 
      >
        {isQuote ? 'We hope to hear from you soon' : (isReceipt ? '' : 'Thank you for choosing our service.')}
      </div>
    </div>
  );
};

export default TemplateOne;
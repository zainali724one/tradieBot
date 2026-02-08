
// const TemplateTwo = ({data}) => {


//   return (
//     <div className="w-[430px] p-6 border-4 mt-3 border-blue-500 rounded-xl bg-white shadow-md font-sans text-sm text-gray-800">
//       <div className="flex justify-between items-center mb-6">
//      {data?.companyLogo && <img src={data?.companyLogo} alt="Company Logo" className="max-h-16 max-w-[130px] object-contain" />}
   
//         <div className="text-right">
//           <h2 className="text-2xl font-bold text-blue-700 uppercase">{data?.type === 'quote' ? 'Quote' : 'Invoice'}</h2>
//           <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
//         </div>
//       </div>

//       <div className="bg-blue-50 p-4 rounded-md space-y-3 border border-blue-200">
//         <h3 className="text-lg font-semibold text-blue-700">{data?.type === 'quote' ? 'Quote Summary' : 'Invoice Summary'}</h3>
//         <p><span className="font-medium">Customer Name:</span> {data?.customerName}</p>
//         <p><span className="font-medium">Job Description:</span> {data?.jobDescription}</p>
//         <p><span className="font-medium">Amount:</span> £{data?.amount}</p>
//         {data?.address && <p><span className="font-medium">Address:</span> {data?.address}</p>}
//         <p><span className="font-medium">Email:</span> {data?.customerEmail}</p>
//         <p><span className="font-medium">Phone:</span> {data?.customerPhone}</p>
       
//       </div>

//       <div className="mt-6 text-center text-xs text-gray-500">
//         We appreciate your business. Let us know if you have any questions.
//       </div>
//     </div>
//   );
// };

// export default TemplateTwo;








const TemplateTwo = ({data}) => {
  const isReceipt = data?.includeReceipt?.toLowerCase() === 'receipt';
  const isQuote = data?.type?.toLowerCase() === 'quote';
  const title = isQuote ? 'Quote' : (isReceipt ? 'Receipt' : 'Invoice');

  return (
    <div className="w-[430px] p-6 border-4 mt-3 border-blue-500 rounded-xl bg-white shadow-md font-sans text-sm text-gray-800 relative overflow-hidden">
      
      {/* --- PAID STAMP --- */}
      {/* {isReceipt && (
        <div className="absolute top-12 right-12 border-4 border-blue-200 text-blue-200 font-bold text-xl px-4 py-1 -rotate-12 select-none z-0">
          PAID
        </div>
      )} */}

      <div className="flex justify-between items-center mb-6 relative z-10">
        {data?.companyLogo && <img src={data?.companyLogo} alt="Company Logo" className="max-h-16 max-w-[130px] object-contain" />}
   
        <div className="text-right">
          <h2 className="text-2xl font-bold text-blue-700 uppercase">{title}</h2>
          <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-md space-y-3 border border-blue-200 relative z-10">
        <h3 className="text-lg font-semibold text-blue-700">{title} Summary</h3>
        <p><span className="font-medium">Customer Name:</span> {data?.customerName}</p>
        <p><span className="font-medium">Job Description:</span> {data?.jobDescription}</p>
        {data?.address && <p><span className="font-medium">Address:</span> {data?.address}</p>}
        <p><span className="font-medium">Email:</span> {data?.customerEmail}</p>
        <p><span className="font-medium">Phone:</span> {data?.customerPhone}</p>
        
        {/* --- FINANCIALS --- */}
        <div className="border-t border-blue-200 pt-2 mt-2">
        { data?.includeCost === "Yes" && <p className="flex justify-between font-bold">
                <span>Material Cost:</span> 
                <span>£{data?.materialCost}</span>
            </p>
}
            <p className="flex justify-between font-bold">
                <span>Total:</span> 
                <span>£{data?.amount}</span>
            </p>
            {isReceipt && (
                <>
                    <p className="flex justify-between text-green-600 text-xs">
                        <span>Total Cost:</span> 
                        <span>(£{data?.materialCost || 0})</span>
                    </p>
                    <p className="flex justify-between font-bold text-blue-900 border-t border-blue-200 mt-1 pt-1">
                        <span>Profit:</span> 
                        <span>£{data?.amount - (data?.materialCost || 0)}</span>
                    </p>
                </>
            )}
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-gray-500">
       {isQuote ? 'We hope to hear from you soon' : (isReceipt ? '' : 'Thank you for choosing our service.')}
      </div>
    </div>
  );
};

export default TemplateTwo;

import React from 'react';

// const TemplateOne = ({data}) => {
//   return (
//     <div className="w-[430px] p-6 mt-3 bg-white rounded-md shadow-xl font-sans text-sm text-gray-800">
//       <div className="flex justify-between items-center mb-6">

//       {data?.companyLogo && <img src={data?.companyLogo} alt="Company Logo" className="max-h-16 max-w-[130px] object-contain" />}
//         <div className="text-right">
//           <h2 className="text-xl font-bold text-gray-700 uppercase">{data?.type === 'quote' ? 'Quote' : 'Invoice'}</h2>
//           <p className="text-xs text-gray-500">{new Date().toLocaleDateString()}</p>
//         </div>
//       </div>

//       <div className="space-y-3">
//         <h3 className="text-lg font-semibold text-gray-700">{data?.type === 'quote' ? 'Quote Summary' : 'Invoice Summary'}</h3>
//         <p><span className="font-medium">Customer Name:</span> {data?.customerName}</p>
//         <p><span className="font-medium">Job Description:</span> {data?.jobDescription}</p>
//         <p><span className="font-medium">Amount:</span> ${data?.amount}</p>
//         {data?.address && <p><span className="font-medium">Address:</span> {data?.address}</p>}
//         <p><span className="font-medium">Email:</span> {data?.customerEmail}</p>
//         <p><span className="font-medium">Phone:</span> {data?.customerPhone}</p>
//         {data?.type === 'quote' && data?.paymentUrl && (
//           <p>
//             <span className="font-medium">Click here to pay:</span>{' '}
//             <a href={data?.paymentUrl} className="text-blue-600 underline break-all">{data?.paymentUrl}</a>
//           </p>
//         )}
//       </div>

//       <div className="mt-6 border-t pt-4 text-xs text-gray-400 text-center">
//         Thank you for choosing our service.
//       </div>
//     </div>
//   );
// };


const TemplateOne = ({data}) => {
  return (
    <div 
      className="w-[430px] p-6 mt-3 bg-white rounded-md shadow-xl font-sans text-sm"
      style={{ color: '#1e293b' }} 
    >
      <div className="flex justify-between items-center mb-6">
        {data?.companyLogo && <img src={data?.companyLogo} alt="Company Logo" className="max-h-16 max-w-[130px] object-contain" />}
        <div className="text-right">
          <h2 
            className="text-xl font-bold uppercase" 
            style={{ color: '#374151' }} // Replaces text-gray-700
          >
            {data?.type === 'quote' ? 'Quote' : 'Invoice'}
          </h2>
          <p 
            className="text-xs" 
            style={{ color: '#6b7280' }} // Replaces text-gray-500
          >
            {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 
          className="text-lg font-semibold" 
          style={{ color: '#374151' }} // Replaces text-gray-700
        >
          {data?.type === 'quote' ? 'Quote Summary' : 'Invoice Summary'}
        </h3>
        <p><span className="font-medium">Customer Name:</span> {data?.customerName}</p>
        <p><span className="font-medium">Job Description:</span> {data?.jobDescription}</p>
        <p><span className="font-medium">Amount:</span> ${data?.amount}</p>
        {data?.address && <p><span className="font-medium">Address:</span> {data?.address}</p>}
        <p><span className="font-medium">Email:</span> {data?.customerEmail}</p>
        <p><span className="font-medium">Phone:</span> {data?.customerPhone}</p>
      </div>

      <div 
        className="mt-6 border-t pt-4 text-xs text-center"
        style={{ color: '#9ca3af' }} // Replaces text-gray-400
      >
        Thank you for choosing our service.
      </div>
    </div>
  );
};

export default TemplateOne;

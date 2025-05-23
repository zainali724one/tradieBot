import React from 'react';

function TermsAndConditionsScreen() {
  const handleBack = () => {
    // Implement navigation back functionality (e.g., using react-router-dom history.goBack())
    console.log('Go back from Terms & Conditions');
    alert('Back button clicked on Terms & Conditions!');
  };

  const termsContent = [
    {
      number: '1.',
      heading: 'Lorem Ipsum is simply dummy text',
      paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      number: '2.',
      heading: 'Lorem Ipsum is simply dummy text',
      paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    {
      number: '3.',
      heading: 'Lorem Ipsum is simply dummy text',
      paragraph: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
    },
    // Add more sections as needed
  ];

  return (
    <div className="w-full max-w-md  min-h-screen flex flex-col bg-[#D3DCE5] mb-10 h-[100dvh]">
      {/* System Status Bar */}
    

      {/* Header */}
      <header className="flex items-center p-4 pt-10 pb-2 relative  z-10 bg-[#D3DCE5]">
        <button onClick={handleBack} className="text-blue-600 absolute left-4 top-10">
          {/* <FaArrowLeft className="text-2xl" /> */}
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold text-gray-800">Terms & Conditions</h1>
      </header>

      {/* Content Area (Scrollable) */}
      <div className="flex-grow overflow-y-auto p-4 pt-0">
        {termsContent.map((item, index) => (
          <div key={index} className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
              <span className="text-blue-600">{item.number}</span> {item.heading}
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {item.paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TermsAndConditionsScreen;
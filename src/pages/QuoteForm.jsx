import React, { useState } from 'react';
// import InputGroup from './InputGroup';
import LabeledInput from '../components/LabeledInput';
import PrimaryButton from '../components/PrimaryButton';
import UserProfile from '../components/ui/UserProfile';
// import TextAreaGroup from './TextAreaGroup';
import TextArea from '../components/ui/TextArea';

function QuoteForm() {
  const [formData, setFormData] = useState({
    customerName: 'Lorem Steve',
    jobDescription: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    quoteAmount: '500',
    customerEmail: 'xya@gmail.com',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to a backend or handle it further
    alert('Quote Submitted (check console for data)');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 mb-10 bg-[#D3DCE5]" style={{height:"100dvh"}}>
        <UserProfile/>
      <h2 className="text-xl font-semibold text-gray-800 mb-6 text-[#5290C1]">Quote</h2>

      <LabeledInput
        label="Customer Name"
        id="customerName"
        placeholder="Customer Name"
        value={formData.customerName}
        onChange={handleChange}
      />

      {/* <TextArea
        label="Job Description"
        id="jobDescription"
        placeholder="Enter job description"
        value={formData.jobDescription}
        onChange={handleChange}
      /> */}

      <LabeledInput
        label="Quote Amount"
        id="quoteAmount"
        type="text" // Keep as text to allow '$' symbol display
        placeholder="$ 0.00"
        value={`$ ${formData.quoteAmount}`}
        onChange={handleChange}
      />

      <LabeledInput
        label="Customer Email"
        id="customerEmail"
        type="email"
        placeholder="customer@example.com"
        value={formData.customerEmail}
        onChange={handleChange}
      />

      {/* <button
        type="submit"
        className="w-full bg-[#5290C1] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 mt-6"
      >
        Continue
      </button> */}
      <PrimaryButton         className="w-full bg-[#5290C1] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 mt-6"
 onClick={handleSubmit} children="Continue" />
    </form>
  );
}

export default QuoteForm;
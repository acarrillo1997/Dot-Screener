import React, { useState } from 'react';

interface DotFormProps {}

const DotForm: React.FC<DotFormProps> = () => {
  const [dotNumber, setDotNumber] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log('DOT Number:', dotNumber);
    // Implement API call and data processing here
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          type="text"
          id="dot-number"
          value={dotNumber}
          onChange={(e) => setDotNumber(e.target.value)}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Enter DOT Number"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default DotForm;

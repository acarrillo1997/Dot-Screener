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
    <form onSubmit={handleSubmit}>
      <label htmlFor="dot-number">Enter DOT Number:</label>
      <input
        type="text"
        id="dot-number"
        value={dotNumber}
        onChange={(e) => setDotNumber(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DotForm;

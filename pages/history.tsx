// History.tsx
import React from 'react';
import { SearchResult } from './search';

interface HistoryProps {
  searchHistory: SearchResult[];
}

const History: React.FC<HistoryProps> = ({ searchHistory }) => {
  return (
    <div>
      <h2>Search History</h2>
      <ul>
        {searchHistory.map((result, index) => (
          <li key={index}>{result.carrierName} - DOT: {result.dotNumber}</li>
        ))}
      </ul>
    </div>
  );
};

export default History;

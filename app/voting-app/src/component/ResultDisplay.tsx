// src/ResultDisplay.tsx

import React from "react";

interface Candidate {
  name: string;
  voteCount: string;
}

interface ResultDisplayProps {
  results: Candidate[];
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ results }) => {
  return (
    <div>
      <h2>Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.name}: {result.voteCount} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultDisplay;

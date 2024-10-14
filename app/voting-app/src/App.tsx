// src/App.tsx

import React, { useState, useEffect } from "react";
import VotingForm from "./component/VotingForm";
import CandidateList from "./component/CandidateList";
import ResultDisplay from "./component/ResultDisplay";
import { Voting } from "./component/voting";

const voting = new Voting();

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [currentLeader, setCurrentLeader] = useState<{
    name: string;
    voteCount: string;
  } | null>(null);

  const fetchResults = async () => {
    const candidates = await voting.getCandidates();
    setResults(candidates);
  };

  const fetchLeader = async () => {
    const leader = await voting.getCurrentLeader();
    setCurrentLeader(leader);
  };

  useEffect(() => {
    fetchResults();
    fetchLeader();
  }, []);

  return (
    <div>
      <h1>Voting App</h1>
      <VotingForm />
      <CandidateList />
      <button onClick={fetchResults}>Get Results</button>
      {currentLeader && (
        <div>
          <h2>Current Leader</h2>
          <p>
            {currentLeader.name}: {currentLeader.voteCount} votes
          </p>
        </div>
      )}
      <ResultDisplay results={results} />
    </div>
  );
};

export default App;

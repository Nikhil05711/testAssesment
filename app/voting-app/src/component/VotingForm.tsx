// src/VotingForm.tsx

import React, { useEffect, useState } from "react";
import { Voting } from "./voting";

const voting = new Voting();

const VotingForm: React.FC = () => {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidateList = await voting.getCandidates();
      setCandidates(candidateList);
    };
    fetchCandidates();
  }, []);

  const handleVote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCandidate !== null) {
      await voting.vote(selectedCandidate);
      alert(`Voted for candidate ID: ${selectedCandidate}`);
    }
  };

  return (
    <form onSubmit={handleVote}>
      <h2>Vote for a Candidate</h2>
      <select
        onChange={(e) => setSelectedCandidate(Number(e.target.value))}
        required
      >
        <option value="">Select a candidate</option>
        {candidates.map((candidate, index) => (
          <option key={index} value={index + 1}>
            {candidate.name}
          </option>
        ))}
      </select>
      <button type="submit">Submit Vote</button>
    </form>
  );
};

export default VotingForm;

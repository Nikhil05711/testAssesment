// src/CandidateList.tsx

import React, { useEffect, useState } from "react";
import { Voting } from "./voting";

const voting = new Voting();

interface Candidate {
  name: string;
  voteCount: string;
  id: number; // Add ID to candidate
}

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      const candidateList = await voting.getCandidates();
      const updatedList = await Promise.all(
        candidateList.map(async (candidate: any, index: number) => ({
          ...candidate,
          voteCount: await voting.getVoteCount(index + 1),
          id: index + 1,
        }))
      );
      setCandidates(updatedList);
    };
    fetchCandidates();
  }, []);

  return (
    <div>
      <h2>Candidates</h2>
      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            {candidate.name}: {candidate.voteCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;

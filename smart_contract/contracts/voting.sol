// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    mapping(uint256 => Candidate) public candidates;
    mapping(address => bool) public registeredVoters;
    mapping(address => bool) public hasVoted;
    
    uint256 public candidatesCount;

    // Event emitted when a new vote is cast
    event VoteCast(address indexed voter, uint256 indexed candidateId);

    // Add a new candidate
    function addCandidate(string memory _name) public {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(_name, 0);
    }

    // Register a voter (for demonstration purposes, normally you would have more checks)
    function registerVoter() public {
        require(!registeredVoters[msg.sender], "Voter already registered");
        registeredVoters[msg.sender] = true;
    }

    // Cast a vote for a candidate
    function vote(uint256 _candidateId) public {
        require(registeredVoters[msg.sender], "You must be a registered voter to vote");
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    // Get the list of candidates
    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory candidateList = new Candidate[](candidatesCount);
        for (uint256 i = 1; i <= candidatesCount; i++) {
            candidateList[i - 1] = candidates[i];
        }
        return candidateList;
    }

    // Get the vote count for a candidate
    function getVoteCount(uint256 _candidateId) public view returns (uint256) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }
}

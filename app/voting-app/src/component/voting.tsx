// src/Voting.ts

import Web3 from "web3";
import VotingContract from "../abi.json"; // ABI file

const contractAddress = "0x2214388f369ea0a2EA060866d6252664A33cF4Be";

export class Voting {
  private web3: Web3;
  private contract: any;

  constructor() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      window.ethereum.request({ method: "eth_requestAccounts" });
    } else {
      throw new Error("Ethereum provider not found");
    }

    this.contract = new this.web3.eth.Contract(VotingContract, contractAddress);
  }

  async registerVoter() {
    const accounts = await this.web3.eth.getAccounts();
    const tx = await this.contract.methods
      .registerVoter()
      .send({ from: accounts[0] });
    return tx;
  }

  async addCandidate(name: string) {
    const accounts = await this.web3.eth.getAccounts();
    const tx = await this.contract.methods
      .addCandidate(name)
      .send({ from: accounts[0] });
    return tx;
  }

  async vote(candidateId: number) {
    const accounts = await this.web3.eth.getAccounts();
    const tx = await this.contract.methods
      .vote(candidateId)
      .send({ from: accounts[0] });
    return tx;
  }

  async getCandidates() {
    const candidates = await this.contract.methods.getCandidates().call();
    return candidates;
  }

  async getVoteCount(candidateId: number) {
    const voteCount = await this.contract.methods
      .getVoteCount(candidateId)
      .call();
    return voteCount;
  }

  async getCurrentLeader() {
    const candidates = await this.getCandidates();
    let leader = { name: "", voteCount: 0 };

    for (const candidate of candidates) {
      const count = await this.getVoteCount(candidate.id);
      if (count > leader.voteCount) {
        leader = { name: candidate.name, voteCount: count };
      }
    }

    return leader;
  }
}

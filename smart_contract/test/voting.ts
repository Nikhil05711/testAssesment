const Voting = artifacts.require("Voting");

contract("Voting", (accounts) => {
  let voting;
  const [owner, voter1, voter2] = accounts;

  beforeEach(async () => {
    voting = await Voting.new();
  });

  it("should add a candidate", async () => {
    await voting.addCandidate("Alice");
    const candidates = await voting.getCandidates();
    assert.equal(candidates.length, 1);
    assert.equal(candidates[0].name, "Alice");
    assert.equal(candidates[0].voteCount.toNumber(), 0);
  });

  it("should register a voter", async () => {
    await voting.registerVoter({ from: voter1 });
    const isRegistered = await voting.registeredVoters(voter1);
    assert.isTrue(isRegistered);
  });

  it("should allow a registered voter to vote", async () => {
    await voting.addCandidate("Alice");
    await voting.registerVoter({ from: voter1 });
    await voting.vote(1, { from: voter1 });
    const candidates = await voting.getCandidates();
    assert.equal(candidates[0].voteCount.toNumber(), 1);
  });

  it("should not allow a voter to vote twice", async () => {
    await voting.addCandidate("Alice");
    await voting.registerVoter({ from: voter1 });
    await voting.vote(1, { from: voter1 });

    try {
      await voting.vote(1, { from: voter1 });
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(
        error.message.includes("You have already voted"),
        "Expected revert error"
      );
    }
  });

  it("should not allow unregistered voters to vote", async () => {
    await voting.addCandidate("Alice");
    try {
      await voting.vote(1, { from: voter2 });
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(
        error.message.includes("You must be a registered voter to vote"),
        "Expected revert error"
      );
    }
  });

  it("should get the vote count for a candidate", async () => {
    await voting.addCandidate("Alice");
    await voting.registerVoter({ from: voter1 });
    await voting.vote(1, { from: voter1 });
    const voteCount = await voting.getVoteCount(1);
    assert.equal(voteCount.toNumber(), 1);
  });

  it("should revert on invalid candidate ID", async () => {
    try {
      await voting.getVoteCount(99);
      assert.fail("Expected revert not received");
    } catch (error) {
      assert(
        error.message.includes("Invalid candidate ID"),
        "Expected revert error"
      );
    }
  });
});

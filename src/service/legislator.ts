import ILegislator from "../model/legislator";
import IVoteResult from "../model/vote-result";
import * as legislatorRepository from "../repository/legislator";
import * as voteResultsRepository from "../repository/voteResults";

const getVotesByLegislator = async () => {
  const legislators: ILegislator[] =
    await legislatorRepository.getAllLegislators();
  const voteResults: IVoteResult[] =
    await voteResultsRepository.getAllVoteResults();

  const legislatorVoteCountMap = new Map();

  for (const voteResult of voteResults) {
    const legislatorId = voteResult.legislator_id;

    if (legislatorVoteCountMap.has(legislatorId)) {
      const voteCount = legislatorVoteCountMap.get(legislatorId);

      if (voteResult.vote_type === "1") {
        voteCount.vote1++;
      } else if (voteResult.vote_type === "2") {
        voteCount.vote2++;
      }
    } else {
      if (voteResult.vote_type === "1") {
        legislatorVoteCountMap.set(legislatorId, {
          id: legislatorId,
          vote1: 1,
          vote2: 0,
        });
      } else if (voteResult.vote_type === "2") {
        legislatorVoteCountMap.set(legislatorId, {
          id: legislatorId,
          vote1: 0,
          vote2: 1,
        });
      }
    }
  }

  for (const legislator of legislators) {
    if (legislatorVoteCountMap.has(legislator.id)) {
      const voteCount = legislatorVoteCountMap.get(legislator.id);
      voteCount.name = legislator.name;
    } else {
      legislatorVoteCountMap.set(legislator.id, {
        id: legislator.id,
        name: legislator.name,
        vote1: 0,
        vote2: 0,
      });
    }
  }

  const votesByLegislator = [...legislatorVoteCountMap.values()];
  votesByLegislator.sort((a, b) => a.name.localeCompare(b.name));
  return votesByLegislator;
};

export { getVotesByLegislator };

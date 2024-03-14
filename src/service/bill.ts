import IBill from "../model/bill";
import ILegislator from "../model/legislator";
import IVoteResult from "../model/vote-result";
import * as legislatorRepository from "../repository/legislator";
import * as voteResultsRepository from "../repository/voteResults";
import * as billRepository from "../repository/bill";
import * as voteRepository from "../repository/vote";
import IVote from "../model/vote";

const getVotesByBill = async () => {
  const legislators: ILegislator[] =
    await legislatorRepository.getAllLegislators();
  const voteResults: IVoteResult[] =
    await voteResultsRepository.getAllVoteResults();
  const bills: IBill[] = await billRepository.getAllBills();
  const votes: IVote[] = await voteRepository.getAllVotes();

  const billVoteCountMap = new Map();

  for (const voteResult of voteResults) {
    const voteId = voteResult.vote_id;

    if (billVoteCountMap.has(voteId)) {
      const voteCount = billVoteCountMap.get(voteId);

      if (voteResult.vote_type === "1") {
        voteCount.vote1++;
      } else if (voteResult.vote_type === "2") {
        voteCount.vote2++;
      }
    } else {
      if (voteResult.vote_type === "1") {
        billVoteCountMap.set(voteId, {
          vote1: 1,
          vote2: 0,
        });
      } else if (voteResult.vote_type === "2") {
        billVoteCountMap.set(voteId, {
          vote1: 0,
          vote2: 1,
        });
      }
    }
  }

  for (const vote of votes) {
    const voteCount = billVoteCountMap.get(vote.id);
    voteCount.bill_id = vote.bill_id;

    const bill = bills.find((b) => b.id === vote.bill_id);
    voteCount.bill_title = bill.title;

    const legislator = legislators.find((l) => l.id === bill.sponsor_id);
    voteCount.sponsor_name = legislator
      ? legislator.name
      : "No Primary Sponsor";
  }

  const votesByBill = [...billVoteCountMap.values()];
  votesByBill.sort((a, b) => a.bill_title.localeCompare(b.bill_title));
  return votesByBill;
};

export { getVotesByBill };

import * as csv from "csv-parser";
import * as fs from "fs";
import IVoteResult from "../model/vote-result";

const getAllVoteResults = (): Promise<IVoteResult[]> => {
  const voteResults: IVoteResult[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("./src/db/vote_results.csv")
      .pipe(csv())
      .on("data", (voteResult) => voteResults.push(voteResult))
      .on("end", () => resolve(voteResults))
      .on("error", (error: any) => reject(error));
  });
};

export { getAllVoteResults };

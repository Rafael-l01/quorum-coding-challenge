import * as csv from "csv-parser";
import * as fs from "fs";
import IVote from "../model/vote";

const getAllVotes = (): Promise<IVote[]> => {
  const votes: IVote[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("./src/db/votes.csv")
      .pipe(csv())
      .on("data", (vote) => votes.push(vote))
      .on("end", () => resolve(votes))
      .on("error", (error: any) => reject(error));
  });
};

export { getAllVotes };

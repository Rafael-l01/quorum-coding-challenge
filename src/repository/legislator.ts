import * as csv from "csv-parser";
import * as fs from "fs";
import ILegislator from "../model/legislator";

const getAllLegislators = (): Promise<ILegislator[]> => {
  const legislators: ILegislator[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("./src/db/legislators.csv")
      .pipe(csv())
      .on("data", (legislator) => legislators.push(legislator))
      .on("end", () => resolve(legislators))
      .on("error", (error: any) => reject(error));
  });
};

export { getAllLegislators };

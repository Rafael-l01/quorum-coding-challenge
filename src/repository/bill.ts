import * as csv from "csv-parser";
import * as fs from "fs";
import IBill from "../model/bill";

const getAllBills = (): Promise<IBill[]> => {
  const bills: IBill[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream("./src/db/bills.csv")
      .pipe(csv())
      .on("data", (bill) => bills.push(bill))
      .on("end", () => resolve(bills))
      .on("error", (error: any) => reject(error));
  });
};

export { getAllBills };

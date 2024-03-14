import { Request, Response } from "express";
import * as billService from "../service/bill";

const getVotesByBill = async (req: Request, res: Response) => {
  try {
    const votesByBill = await billService.getVotesByBill();
    res.status(200).json(votesByBill);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export { getVotesByBill };

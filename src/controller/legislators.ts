import { Request, Response } from "express";
import * as legislatorService from "../service/legislator";

const getVotesByLegislator = async (req: Request, res: Response) => {
  try {
    const votesByLegislator = await legislatorService.getVotesByLegislator();
    res.status(200).json(votesByLegislator);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

export { getVotesByLegislator };

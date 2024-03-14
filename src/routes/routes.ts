import { Router } from "express";
import * as legislatorController from "../controller/legislators";
import * as billController from "../controller/bills";

const router = Router();

router.get(
  "/legislator/bills-voted",
  legislatorController.getVotesByLegislator
);

router.get("/bill/legislators-votes", billController.getVotesByBill);

export default router;

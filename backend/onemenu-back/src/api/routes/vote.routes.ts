import { Router } from "express";
import { VoteController } from "../controllers/vote.controller";

const router = Router();
const controller = new VoteController();

router.get("/", (req, res) => controller.getAllVotes(req, res));
router.get("/dish/:dishID", (req, res) =>
  controller.getVotesByDishID(req, res)
);
router.get("/user/:userID", (req, res) =>
  controller.getVotesByUserID(req, res)
);
router.get("/:dishID/:userID", (req, res) => controller.getVoteByIDs(req, res));
router.post("/", (req, res) => controller.createVote(req, res));
router.put("/:dishID/:userID", (req, res) => controller.updateVote(req, res));
router.delete("/:dishID/:userID", (req, res) =>
  controller.deleteVote(req, res)
);

export default router;

import { Router } from "express";
import { InvitationController } from "../controllers/invitation.controller";

const router = Router();
const controller = new InvitationController();

router.get("/", (req, res) => controller.getAllInvitations(req, res));
router.get("/user/:userID", (req, res) =>
  controller.getInvitationsByUserID(req, res)
);
router.get("/session/:sessionID", (req, res) =>
  controller.getInvitationsBySessionID(req, res)
);
router.get("/:sessionID/:userID", (req, res) =>
  controller.getInvitationsByIDs(req, res)
);
router.post("/", (req, res) => controller.createInvitation(req, res));
router.put("/:sessionID/:userID", (req, res) =>
  controller.updateInvitation(req, res)
);
router.delete("/:sessionID/:userID", (req, res) =>
  controller.deleteInvitation(req, res)
);

export default router;

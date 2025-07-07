import { Router } from "express";
import { SessionController } from "../controllers/session.controller";

const router = Router();
const controller = new SessionController();

router.get("/", (req, res) => controller.getAllSessions(req, res));
router.get("/:id", (req, res) => controller.getSessionByID(req, res));
router.get("/user/:userID", (req, res) =>
  controller.getSessionsByCreator(req, res)
);
router.post("/", (req, res) => controller.createSession(req, res));
router.put("/:id", (req, res) => controller.updateSession(req, res));
router.delete("/:id", (req, res) => controller.deleteSession(req, res));

export default router;

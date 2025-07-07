import { Router } from "express";
import { UserRoleController } from "../controllers/user-role.controller";

const router = Router();
const controller = new UserRoleController();

router.get("/", (req, res) => controller.getAllUserRoles(req, res));
router.get("/user/:userID", (req, res) =>
  controller.getUserRolesByUserID(req, res)
);
router.get("/role/:roleID", (req, res) =>
  controller.getUserRolesByRoleID(req, res)
);
router.get("/:userID/:roleID", (req, res) =>
  controller.getUserRoleByIDs(req, res)
);
router.post("/", (req, res) => controller.createUserRole(req, res));
router.put("/:userID/:roleID", (req, res) =>
  controller.updateUserRole(req, res)
);
router.delete("/:userID/:roleID", (req, res) =>
  controller.deleteUserRole(req, res)
);

export default router;

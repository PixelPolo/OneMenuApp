import { Router } from "express";
import { RoleController } from "../controllers/role.controller";

const router = Router();
const controller = new RoleController();

router.get("/", (req, res) => controller.getAllRoles(req, res));
router.get("/:id", (req, res) => controller.getRoleByID(req, res));
router.post("/", (req, res) => controller.createRole(req, res));
router.put("/:id", (req, res) => controller.updateRole(req, res));
router.delete("/:id", (req, res) => controller.deleteRole(req, res));

export default router;

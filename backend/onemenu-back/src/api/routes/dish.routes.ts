import { Router } from "express";
import { DishController } from "../controllers/dish.controller";

const router = Router();
const controller = new DishController();

router.get("/", (req, res) => controller.getAllDish(req, res));
router.get("/sessionID/:sessionID", (req, res) =>
  controller.getDishesBySessionID(req, res)
);
router.get("/:id", (req, res) => controller.getDishByID(req, res));
router.post("/", (req, res) => controller.createDish(req, res));
router.put("/:id", (req, res) => controller.updateDish(req, res));
router.delete("/:id", (req, res) => controller.deleteDish(req, res));

export default router;

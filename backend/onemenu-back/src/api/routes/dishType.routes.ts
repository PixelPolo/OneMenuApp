import { Router } from "express";
import { DishTypeController } from "../controllers/dishType.controller";

const router = Router();
const controller = new DishTypeController();

router.get("/", (req, res) => controller.getAllDishType(req, res));
router.get("/:id", (req, res) => controller.getDishTypeByID(req, res));
router.get("/name/:name", (req, res) => controller.getDishTypeByName(req, res));
router.post("/", (req, res) => controller.createDishType(req, res));
router.put("/:id", (req, res) => controller.updateDishType(req, res));
router.delete("/:id", (req, res) => controller.deleteDishType(req, res));

export default router;

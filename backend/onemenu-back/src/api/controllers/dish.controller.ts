import { dish } from "@prisma/client";
import { Request, Response } from "express";
import { DishService } from "../services/dish.service";

export class DishController {
  private dishService: DishService;

  constructor() {
    this.dishService = new DishService();
  }

  // GET /dish
  async getAllDish(_req: Request, res: Response): Promise<any> {
    try {
      const dish: dish[] = await this.dishService.getAll();
      console.log(dish);
      res.status(200).json(dish);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /dish/sessionID/:sessionID
  async getDishesBySessionID(req: Request, res: Response): Promise<any> {
    try {
      const dishes: dish[] | null = await this.dishService.getBySessionID(
        req.params.sessionID
      );
      console.log(dishes);
      res.status(200).json(dishes);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /dish/:id
  async getDishByID(req: Request, res: Response): Promise<any> {
    try {
      const dish: dish | null = await this.dishService.getByID(req.params.id);
      console.log(dish);
      res.status(200).json(dish);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // POST /dish
  async createDish(req: Request, res: Response): Promise<any> {
    try {
      const dish: dish = await this.dishService.create(req.body);
      console.log(dish);
      res.status(201).json(dish);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // PATCH /dish
  async updateDish(req: Request, res: Response): Promise<any> {
    try {
      const updatedDish: dish | null = await this.dishService.update(
        req.params.id,
        req.body
      );
      console.log(updatedDish);
      res.status(200).json(updatedDish);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // DELETE /dish/:id
  async deleteDish(req: Request, res: Response): Promise<any> {
    try {
      await this.dishService.delete(req.params.id);
      res.status(204).send();
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

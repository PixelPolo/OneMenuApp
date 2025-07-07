import { dishType } from "@prisma/client";
import { Request, Response } from "express";
import { DishTypeService } from "../services/dishType.service";

export class DishTypeController {
  private dishTypeService: DishTypeService;

  constructor() {
    this.dishTypeService = new DishTypeService();
  }

  // GET /dishType
  async getAllDishType(_req: Request, res: Response): Promise<any> {
    try {
      const dishType: dishType[] = await this.dishTypeService.getAll();
      console.log(dishType);
      res.status(200).json(dishType);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /dishType/:id
  async getDishTypeByID(req: Request, res: Response): Promise<any> {
    try {
      const dishType: dishType | null = await this.dishTypeService.getByID(
        req.params.id
      );
      console.log(dishType);
      res.status(200).json(dishType);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /dishType/:name
  async getDishTypeByName(req: Request, res: Response): Promise<any> {
    try {
      const dishType: dishType | null = await this.dishTypeService.getByName(
        req.params.name
      );
      console.log(dishType);
      res.status(200).json(dishType);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // POST /dishType
  async createDishType(req: Request, res: Response): Promise<any> {
    try {
      const dishType: dishType = await this.dishTypeService.create(req.body);
      console.log(dishType);
      res.status(201).json(dishType);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // PATCH /dishType
  async updateDishType(req: Request, res: Response): Promise<any> {
    try {
      const updatedDishType: dishType | null =
        await this.dishTypeService.update(req.params.id, req.body);
      console.log(updatedDishType);
      res.status(200).json(updatedDishType);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // DELETE /dishType/:id
  async deleteDishType(req: Request, res: Response): Promise<any> {
    try {
      await this.dishTypeService.delete(req.params.id);
      res.status(204).send();
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

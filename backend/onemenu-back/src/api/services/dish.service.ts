import prisma from "../client/prisma.client";
import { dish } from "@prisma/client";

export class DishService {
  // Get all
  async getAll(): Promise<dish[]> {
    return await prisma.dish.findMany();
  }

  // Get all by sessionID
  async getBySessionID(sessionID: string): Promise<dish[]> {
    return await prisma.dish.findMany({ where: { sessionID } });
  }

  // Get by ID
  async getByID(id: string): Promise<dish | null> {
    return await prisma.dish.findUnique({
      where: { dishID: id },
    });
  }

  // Create
  async create(data: dish): Promise<dish> {
    return await prisma.dish.create({ data });
  }

  // Update
  async update(id: string, data: dish): Promise<dish | null> {
    return await prisma.dish.update({
      where: { dishID: id },
      data,
    });
  }

  // Delete
  async delete(id: string): Promise<dish> {
    return await prisma.dish.delete({
      where: { dishID: id },
    });
  }
}

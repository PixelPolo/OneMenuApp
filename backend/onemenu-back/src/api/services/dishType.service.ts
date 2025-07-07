import prisma from "../client/prisma.client";
import { dishType } from "@prisma/client";

export class DishTypeService {
  // Get all
  async getAll(): Promise<dishType[]> {
    return await prisma.dishType.findMany();
  }

  // Get by ID
  async getByID(id: string): Promise<dishType | null> {
    return await prisma.dishType.findUnique({
      where: { dishTypeID: id },
    });
  }

  // Get by name
  async getByName(name: string): Promise<dishType | null> {
    return await prisma.dishType.findUnique({ where: { name } });
  }

  // Create
  async create(data: dishType): Promise<dishType> {
    return await prisma.dishType.create({ data });
  }

  // Update
  async update(id: string, data: dishType): Promise<dishType | null> {
    return await prisma.dishType.update({
      where: { dishTypeID: id },
      data,
    });
  }

  // Delete
  async delete(id: string): Promise<dishType> {
    return await prisma.dishType.delete({
      where: { dishTypeID: id },
    });
  }
}

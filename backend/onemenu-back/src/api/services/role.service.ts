import prisma from "../client/prisma.client";
import { role } from "@prisma/client";

export class RoleService {
  // Get all
  async getAll(): Promise<role[]> {
    return await prisma.role.findMany();
  }

  // Get by ID
  async getByID(id: string): Promise<role | null> {
    return await prisma.role.findUnique({
      where: { roleID: id },
    });
  }

  // Create
  async create(data: role): Promise<role> {
    return await prisma.role.create({ data });
  }

  // Update
  async update(id: string, data: role): Promise<role | null> {
    return await prisma.role.update({
      where: { roleID: id },
      data,
    });
  }

  // Delete
  async delete(id: string): Promise<role> {
    return await prisma.role.delete({
      where: { roleID: id },
    });
  }
}

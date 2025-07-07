import { userRole } from "@prisma/client";
import prisma from "../client/prisma.client";

export class UserRoleService {
  // Get all
  async getAll(): Promise<userRole[]> {
    return await prisma.userRole.findMany();
  }

  // Get all by userID
  async getByUserID(userID: string): Promise<userRole[]> {
    return await prisma.userRole.findMany({ where: { userID } });
  }

  // Get all by roleID
  async getByRoleID(roleID: string): Promise<userRole[]> {
    return await prisma.userRole.findMany({ where: { roleID } });
  }

  // Get one by userID and roleID
  async getByUserIDAndRoleID(
    userID: string,
    roleID: string
  ): Promise<userRole | null> {
    return await prisma.userRole.findUnique({
      where: { userID_roleID: { userID, roleID } },
    });
  }

  // Create
  async create(data: userRole): Promise<userRole> {
    return await prisma.userRole.create({ data });
  }

  // Update
  async update(
    userID: string,
    roleID: string,
    data: userRole
  ): Promise<userRole | null> {
    return await prisma.userRole.update({
      where: { userID_roleID: { userID, roleID } },
      data,
    });
  }

  // Delete
  async delete(userID: string, roleID: string): Promise<userRole> {
    return await prisma.userRole.delete({
      where: { userID_roleID: { userID, roleID } },
    });
  }
}

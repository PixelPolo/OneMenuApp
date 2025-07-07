import prisma from "../client/prisma.client";
import { session } from "@prisma/client";

export class SessionService {
  // Get all
  async getAll(): Promise<session[]> {
    return await prisma.session.findMany();
  }

  // Get by ID
  async getByID(id: string): Promise<session | null> {
    return await prisma.session.findUnique({
      where: { sessionID: id },
    });
  }

  // Get by creator (userID)
  async getByCreatorID(userID: string): Promise<session[]> {
    return await prisma.session.findMany({ where: { userID } });
  }

  // Create
  async create(data: session): Promise<session> {
    return await prisma.session.create({ data });
  }

  // Update
  async update(id: string, data: session): Promise<session | null> {
    return await prisma.session.update({
      where: { sessionID: id },
      data,
    });
  }

  // Delete
  async delete(id: string): Promise<session> {
    return await prisma.session.delete({
      where: { sessionID: id },
    });
  }
}

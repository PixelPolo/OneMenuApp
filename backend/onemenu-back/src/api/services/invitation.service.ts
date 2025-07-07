import { invitation } from "@prisma/client";
import prisma from "../client/prisma.client";

export class InvitationService {
  // Get all
  async getAll(): Promise<invitation[]> {
    return await prisma.invitation.findMany();
  }

  // Get all by userID
  async getByUserID(userID: string): Promise<invitation[]> {
    return await prisma.invitation.findMany({ where: { userID } });
  }

  // Get all by sessionID
  async getBySessionID(sessionID: string): Promise<invitation[]> {
    return await prisma.invitation.findMany({ where: { sessionID } });
  }

  // Get one by sessionID and userID
  async getBySessionIDAndUserID(
    sessionID: string,
    userID: string
  ): Promise<invitation | null> {
    return await prisma.invitation.findUnique({
      where: { sessionID_userID: { sessionID, userID } },
    });
  }

  // Create
  async create(data: invitation): Promise<invitation> {
    return await prisma.invitation.create({ data });
  }

  // Update
  async update(
    sessionID: string,
    userID: string,
    data: invitation
  ): Promise<invitation | null> {
    return await prisma.invitation.update({
      where: { sessionID_userID: { sessionID, userID } },
      data,
    });
  }

  // Delete
  async delete(sessionID: string, userID: string): Promise<invitation> {
    return await prisma.invitation.delete({
      where: { sessionID_userID: { sessionID, userID } },
    });
  }
}

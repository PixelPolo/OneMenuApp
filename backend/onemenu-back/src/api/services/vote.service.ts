import { vote } from "@prisma/client";
import prisma from "../client/prisma.client";

export class VoteService {
  // Get all
  async getAll(): Promise<vote[]> {
    return await prisma.vote.findMany();
  }

  // Get all by dishID
  async getByDishID(dishID: string): Promise<vote[]> {
    return await prisma.vote.findMany({ where: { dishID } });
  }

  // Get all by userID
  async getByUserID(userID: string): Promise<vote[]> {
    return await prisma.vote.findMany({ where: { userID } });
  }

  // Get one by dishID and userID
  async getByDishIDAndUserID(
    dishID: string,
    userID: string
  ): Promise<vote | null> {
    return await prisma.vote.findUnique({
      where: { dishID_userID: { dishID, userID } },
    });
  }

  // Create
  async create(data: vote): Promise<vote> {
    return await prisma.vote.create({ data });
  }

  // Update
  async update(
    dishID: string,
    userID: string,
    data: vote
  ): Promise<vote | null> {
    return await prisma.vote.update({
      where: { dishID_userID: { dishID, userID } },
      data,
    });
  }

  // Delete
  async delete(dishID: string, userID: string): Promise<vote> {
    return await prisma.vote.delete({
      where: { dishID_userID: { dishID, userID } },
    });
  }
}

import { vote } from "@prisma/client";
import { Request, Response } from "express";
import { VoteService } from "../services/vote.service";

export class VoteController {
  private voteService: VoteService;

  constructor() {
    this.voteService = new VoteService();
  }

  // GET /vote
  async getAllVotes(_req: Request, res: Response): Promise<any> {
    try {
      const votes: vote[] = await this.voteService.getAll();
      console.log(votes);
      res.status(200).json(votes);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /vote/dish/:dishID
  async getVotesByDishID(req: Request, res: Response): Promise<any> {
    try {
      const vote: vote[] | null = await this.voteService.getByDishID(
        req.params.dishID
      );
      console.log(vote);
      res.status(200).json(vote);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /vote/user/:userID
  async getVotesByUserID(req: Request, res: Response): Promise<any> {
    try {
      const votes: vote[] | null = await this.voteService.getByUserID(
        req.params.userID
      );
      console.log(votes);
      res.status(200).json(votes);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /vote/:dishID/:userID
  async getVoteByIDs(req: Request, res: Response): Promise<any> {
    try {
      const vote: vote | null = await this.voteService.getByDishIDAndUserID(
        req.params.dishID,
        req.params.userID
      );
      console.log(vote);
      res.status(200).json(vote);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // POST /vote
  async createVote(req: Request, res: Response): Promise<any> {
    try {
      const newVote: vote = await this.voteService.create(req.body);
      console.log(newVote);
      res.status(201).json(newVote);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // PATCH /vote/:dishID/:userID
  async updateVote(req: Request, res: Response): Promise<any> {
    try {
      const updatedVote: vote | null = await this.voteService.update(
        req.params.dishID,
        req.params.userID,
        req.body
      );
      console.log(updatedVote);
      res.status(200).json(updatedVote);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // DELETE /vote/:dishID/:userID
  async deleteVote(req: Request, res: Response): Promise<any> {
    try {
      await this.voteService.delete(req.params.dishID, req.params.userID);
      res.status(204).send();
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

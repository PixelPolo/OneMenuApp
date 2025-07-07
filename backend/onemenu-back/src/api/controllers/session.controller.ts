import { session } from "@prisma/client";
import { SessionService } from "../services/session.service";
import { Request, Response } from "express";

export class SessionController {
  private sessionService: SessionService;

  constructor() {
    this.sessionService = new SessionService();
  }

  // GET /session
  async getAllSessions(_req: Request, res: Response): Promise<any> {
    try {
      const sessions: session[] = await this.sessionService.getAll();
      console.log(sessions);
      res.status(200).json(sessions);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /session/:id
  async getSessionByID(req: Request, res: Response): Promise<any> {
    try {
      const session: session | null = await this.sessionService.getByID(
        req.params.id
      );
      console.log(session);
      res.status(200).json(session);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /session/:userID
  async getSessionsByCreator(req: Request, res: Response): Promise<any> {
    try {
      const sessions: session[] = await this.sessionService.getByCreatorID(
        req.params.userID
      );
      console.log(sessions);
      res.status(200).json(sessions);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // POST /session
  async createSession(req: Request, res: Response): Promise<any> {
    try {
      const newSession: session = await this.sessionService.create(req.body);
      console.log(newSession);
      res.status(201).json(newSession);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // PATCH /session
  async updateSession(req: Request, res: Response): Promise<any> {
    try {
      const updatedSession: session | null = await this.sessionService.update(
        req.params.id,
        req.body
      );
      console.log(updatedSession);
      res.status(200).json(updatedSession);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // DELETE /session/:id
  async deleteSession(req: Request, res: Response): Promise<any> {
    try {
      await this.sessionService.delete(req.params.id);
      res.status(204).send();
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

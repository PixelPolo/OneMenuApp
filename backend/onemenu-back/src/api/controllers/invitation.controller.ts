import { invitation } from "@prisma/client";
import { Request, Response } from "express";
import { InvitationService } from "../services/invitation.service";

export class InvitationController {
  private invitationService: InvitationService;

  constructor() {
    this.invitationService = new InvitationService();
  }

  // GET /invitation
  async getAllInvitations(_req: Request, res: Response): Promise<any> {
    try {
      const invitations: invitation[] = await this.invitationService.getAll();
      console.log(invitations);
      res.status(200).json(invitations);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /invitation/user/:userID
  async getInvitationsByUserID(req: Request, res: Response): Promise<any> {
    try {
      const invitations: invitation[] | null =
        await this.invitationService.getByUserID(req.params.userID);
      console.log(invitations);
      res.status(200).json(invitations);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /invitation/session/:sessionID
  async getInvitationsBySessionID(req: Request, res: Response): Promise<any> {
    try {
      const invitations: invitation[] | null =
        await this.invitationService.getBySessionID(req.params.sessionID);
      console.log(invitations);
      res.status(200).json(invitations);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /invitaion/:sessionID/:userID
  async getInvitationsByIDs(req: Request, res: Response): Promise<any> {
    try {
      const invitaion: invitation | null =
        await this.invitationService.getBySessionIDAndUserID(
          req.params.sessionID,
          req.params.userID
        );
      console.log(invitaion);
      res.status(200).json(invitaion);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // POST /invitation
  async createInvitation(req: Request, res: Response): Promise<any> {
    try {
      const newInvitation: invitation = await this.invitationService.create(
        req.body
      );
      console.log(newInvitation);
      res.status(201).json(newInvitation);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // PATCH /invitation/:sessionID/:userID
  async updateInvitation(req: Request, res: Response): Promise<any> {
    try {
      const updatedInvitation: invitation | null =
        await this.invitationService.update(
          req.params.sessionID,
          req.params.userID,
          req.body
        );
      console.log(updatedInvitation);
      res.status(200).json(updatedInvitation);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // DELETE /invitation/:sessionID/:userID
  async deleteInvitation(req: Request, res: Response): Promise<any> {
    try {
      await this.invitationService.delete(
        req.params.sessionID,
        req.params.userID
      );
      res.status(204).send();
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

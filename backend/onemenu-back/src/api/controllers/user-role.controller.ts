import { userRole } from "@prisma/client";
import { Request, Response } from "express";
import { UserRoleService } from "../services/user-role.service";

export class UserRoleController {
  private userRoleService: UserRoleService;

  constructor() {
    this.userRoleService = new UserRoleService();
  }

  // GET /userRole
  async getAllUserRoles(_req: Request, res: Response): Promise<any> {
    try {
      const userRoles: userRole[] = await this.userRoleService.getAll();
      console.log(userRoles);
      res.status(200).json(userRoles);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /userRole/user/:userID
  async getUserRolesByUserID(req: Request, res: Response): Promise<any> {
    try {
      const userRoles: userRole[] | null =
        await this.userRoleService.getByUserID(req.params.userID);
      console.log(userRoles);
      res.status(200).json(userRoles);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /userRole/role/:roleID
  async getUserRolesByRoleID(req: Request, res: Response): Promise<any> {
    try {
      const userRoles: userRole[] | null =
        await this.userRoleService.getByRoleID(req.params.roleID);
      console.log(userRoles);
      res.status(200).json(userRoles);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /userRole/:userID/:roleID
  async getUserRoleByIDs(req: Request, res: Response): Promise<any> {
    try {
      const userRole: userRole | null =
        await this.userRoleService.getByUserIDAndRoleID(
          req.params.userID,
          req.params.roleID
        );
      console.log(userRole);
      res.status(200).json(userRole);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // POST /userRole
  async createUserRole(req: Request, res: Response): Promise<any> {
    try {
      const newUserRole: userRole = await this.userRoleService.create(req.body);
      console.log(newUserRole);
      res.status(201).json(newUserRole);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // PATCH /userRole/:userID/:roleID
  async updateUserRole(req: Request, res: Response): Promise<any> {
    try {
      const updatedUserRole: userRole | null =
        await this.userRoleService.update(
          req.params.userID,
          req.params.roleID,
          req.body
        );
      console.log(updatedUserRole);
      res.status(200).json(updatedUserRole);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // DELETE /userRole/:userID/:roleID
  async deleteUserRole(req: Request, res: Response): Promise<any> {
    try {
      await this.userRoleService.delete(req.params.userID, req.params.roleID);
      res.status(204).send();
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

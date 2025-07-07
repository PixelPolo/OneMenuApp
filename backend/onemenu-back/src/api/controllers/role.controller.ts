import { role } from "@prisma/client";
import { RoleService } from "../services/role.service";
import { Request, Response } from "express";

export class RoleController {
  private roleService: RoleService;

  constructor() {
    this.roleService = new RoleService();
  }

  // GET /role
  async getAllRoles(_req: Request, res: Response): Promise<any> {
    try {
      const roles: role[] = await this.roleService.getAll();
      console.log(roles);
      res.status(200).json(roles);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // GET /role/:id
  async getRoleByID(req: Request, res: Response): Promise<any> {
    try {
      const role: role | null = await this.roleService.getByID(req.params.id);
      console.log(role);
      res.status(200).json(role);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // POST /role
  async createRole(req: Request, res: Response): Promise<any> {
    try {
      const newRole: role = await this.roleService.create(req.body);
      console.log(newRole);
      res.status(201).json(newRole);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // PATCH /role
  async updateRole(req: Request, res: Response): Promise<any> {
    try {
      const updatedRole: role | null = await this.roleService.update(
        req.params.id,
        req.body
      );
      console.log(updatedRole);
      res.status(200).json(updatedRole);
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // DELETE /role/:id
  async deleteRole(req: Request, res: Response): Promise<any> {
    try {
      await this.roleService.delete(req.params.id);
      res.status(204).send();
    } catch (error: unknown) {
      console.error(error);
      res.status(400).json({ error: (error as Error).message });
    }
  }
}

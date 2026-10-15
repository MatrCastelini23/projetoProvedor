import z from "zod";
import { ProviderClientService } from "../services/ProviderClientService.ts";
import { Request, Response, NextFunction } from "express";

export class ProviderClientController {
  constructor(private readonly serv: ProviderClientService) { };

  private schemaCreateProviderClient = z.object({
    razaosocial: z.string({ message: "Razao social obrigatório" }).max(100),
    cnpjCpf: z.string().min(11).max(14),
    email: z.email().max(100),
    phone: z.string().max(11),
    providerId: z.number().int().positive(),
  })

  newProviderClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.schemaCreateProviderClient.parse(req.body);
      await this.serv.createProviderClient(data);
      res.status(201).json({ message: "Cliente Final cadastrado" })
    } catch (error) {
      next(error)
    }
  }
}
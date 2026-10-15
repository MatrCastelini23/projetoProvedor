import z from "zod";
import { ProviderClientService } from "../services/ProviderClientService.ts";
import { Request, Response, NextFunction } from "express";
import { schemaDidsCreate } from "../schemas/DidsSchemas.ts";

export class ProviderClientController {
  constructor(private readonly serv: ProviderClientService) { };

  private schemaCreateProviderClient = z.object({
    razaosocial: z.string({ message: "Razao social obrigatório" }).max(100),
    cnpjCpf: z.string().min(11).max(14),
    email: z.email().max(100),
    phone: z.string().max(11),
    providerId: z.number().int().positive(),
    dids: z.array(schemaDidsCreate).default([]),
  })

  newProviderClient = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { dids, ...clientData } = this.schemaCreateProviderClient.parse(req.body);
      await this.serv.createProviderClient(clientData, dids);
      res.status(201).json({ message: "Cliente Final cadastrado" })
    } catch (error) {
      next(error)
    }
  }
}
import { Request, Response, NextFunction } from "express";
import { ProvidersService } from "../services/ProviderService.ts";
import z, { number } from "zod";
import AppError from "../utils/AppError.ts";
import { id } from "zod/locales";


export class ProviderController {
  constructor(private readonly serv: ProvidersService) { };

  private schemaCreate = z.object({
    razaosocial: z.string({ message: "Razao social obrigatório" }).max(100),
    email: z.email().max(100),
    phone: z.string().max(11),
    dataCadastro: z.date(),
    planoId: z.number().int().positive().nullable().optional(),
    cnpj: z.string().length(100),
  })

  newProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.schemaCreate.parse(req.body);
      await this.serv.createProvider(data);

      res.status(201).json({ message: "Provedor criado" });
    } catch (error) {
      next(error)
    }
  }

  listAllProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.serv.getProviders();
      if (!data) {
        throw new AppError(404, "Sem provedores cadastrados")
      }
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }

  getOneProvider = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      if (!id) {
        throw new AppError(400, "Id não fornecido")
      }
      const idNumber = Number(id);
      const data = await this.serv.getProviderDetails(idNumber);
      if (!data) {
        throw new AppError(404, "Provedor não encontrado")
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
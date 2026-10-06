import { Request, Response, NextFunction } from "express";
import z from "zod";
import { PlanosService } from "../services/PlanosSerivice.js";
import AppError from "../utils/AppError.js";

export class PlanosController {
  constructor(private readonly serv: PlanosService) { };

  private schemaCreate = z.object({
    name: z.string({ message: "Nome obrigatorio" }).length(100),
    description: z.string({ message: "Descrição obrigatoria" }).length(100),
    price: z.number({ message: "Use duas casais decimais" }).refine((val) => Number.isFinite(val) && Math.abs(val * 100 - Math.trunc(val * 100)) < Number.EPSILON, "Deve ter no máximo 2 casas decimais"),
    totalDids: z.number({ message: "Use números inteiro" }).int(),
  })

  newPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = this.schemaCreate.parse(req.body);
      await this.serv.createPlan(data);

      res.status(201).json({ message: "Plano Criado" });
    } catch (error) {
      next(error)
    }
  }

  listAllPlans = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.serv.getPlans();
      if (!data) {
        throw new AppError(404, "Nenhum plano cadastrado")
      }
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
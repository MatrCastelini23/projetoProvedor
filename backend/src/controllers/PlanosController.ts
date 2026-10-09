import { Request, Response, NextFunction } from "express";
import z from "zod";
import { PlanosService } from "../services/PlanosService.ts";
import AppError from "../utils/AppError.js";

export class PlanosController {
  constructor(private readonly serv: PlanosService) { };

  private schemaCreate = z.object({
    name: z.string({ message: "Nome obrigatório" }).min(1, { message: "Nome muito curto" }).max(100),
    description: z.string({ message: "Descrição obrigatória" }).max(100),
    price: z
      .number({ message: "Preço inválido" })
      .positive("O preço deve ser maior que zero")
      .multipleOf(0.01, "Deve ter no máximo 2 casas decimais"),
    totalDids: z.number({ message: "Use números inteiros" }).int(),
    valorExcedente: z.number().nonnegative(),
  })

  private updatePlanSchema = z
    .object({
      name: z.string().min(1),
      description: z.string({ message: "Descrição obrigatória" }).max(100),
      price: z.number().nonnegative(),
      totalDids: z.number().int().nonnegative(),
      valorExcedente: z.number().nonnegative(),
    })
    .partial()
    .refine((d) => Object.keys(d).length > 0, {
      message: "Envie ao menos um campo para atualizar",
    });

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

  editPlan = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = z.coerce.number().int().positive().safeParse(req.params.id);
      if (!id.success) throw new AppError(400, "ID inválido");

      const body = this.updatePlanSchema.safeParse(req.body);
      if (!body.success) throw new AppError(400, body.error.issues[0]?.message ?? "Erro no envio do body");

      await this.serv.updatePlan(id.data, body.data);
      res.status(200).json({ message: "Plano atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}
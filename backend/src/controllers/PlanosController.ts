import { UserService } from "../services/UserService";
import z, { int } from "zod";

export class PlanosController {
  constructor(private readonly serv: UserService) { };

  private schemaCreate = z.object({
    name: z.string({ message: "Nome obrigatorio" }).length(100),
    description: z.string({ message: "Descrição obrigatoria" }).length(100),
    price: z.number({ message: "Use duas casais decimais" }).refine((val) => Number.isFinite(val) && Math.abs(val * 100 - Math.trunc(val * 100)) < Number.EPSILON, "Deve ter no máximo 2 casas decimais"),
    totalDids: z.number({ message: "Use números inteiro" }).int(),
  })


}
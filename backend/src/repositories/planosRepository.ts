import { Repository } from "typeorm";
import PlanosEntity from "../models/PlanosEntity.js";

export type UpdatePlanData = {
  [K in "name" | "description" | "price" | "totalDids" | "valorExcedente"]?:
  PlanosEntity[K] | undefined;
};

export interface IPlanosRepository {
  createPlan(data: Omit<PlanosEntity, "id" | "providers">): Promise<PlanosEntity>;
  getPlans(): Promise<PlanosEntity[]>;
  updatePlan(id: number, data: UpdatePlanData): Promise<PlanosEntity | null>
}

export class PlanosRepository implements IPlanosRepository {
  constructor(private readonly repo: Repository<PlanosEntity>) { };

  async createPlan(data: Omit<PlanosEntity, "id" | "providers">): Promise<PlanosEntity> {
    const input = this.repo.create(data);
    const save = await this.repo.save(input);
    return (save);
  }

  async getPlans(): Promise<PlanosEntity[]> {
    const data = await this.repo.find({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        totalDids: true,
        valorExcedente: true,
      }
    })
    return data ?? undefined
  }

  async updatePlan(id: number, data: UpdatePlanData): Promise<PlanosEntity | null> {
    const planToUpdate = await this.repo.findOneBy({ id });
    if (!planToUpdate) return null;
    //guardrail para que o merge não substitua um valor valido por undefined
    const clean = Object.fromEntries(
      Object.entries(data).filter(([, v]) => v !== undefined)
    );
    this.repo.merge(planToUpdate, clean);
    return this.repo.save(planToUpdate);
  }
}
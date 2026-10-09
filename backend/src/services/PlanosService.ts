import PlanosEntity from "../models/PlanosEntity.ts";
import { IPlanosRepository, UpdatePlanData } from "../repositories/planosRepository.ts";
import AppError from "../utils/AppError.ts";

export class PlanosService {
  constructor(private readonly repo: IPlanosRepository) { };

  async createPlan(data: { name: string; description: string; price: number; totalDids: number, valorExcedente: number }) {
    const plan = await this.repo.createPlan(data)
    return plan;
  }

  async getPlans(): Promise<PlanosEntity[]> {
    const plans = await this.repo.getPlans();
    return plans;
  }

  async updatePlan(id: number, data: UpdatePlanData) {
    const updated = await this.repo.updatePlan(id, data);
    if (!updated) throw new AppError(404, "Plano não encontrado");
    return updated;
  }
}
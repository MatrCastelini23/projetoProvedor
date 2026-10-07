import PlanosEntity from "../models/PlanosEntity.ts";
import { IPlanosRepository } from "../repositories/planosRepository.ts";



export class PlanosService {
  constructor(private readonly repo: IPlanosRepository) { };

  async createPlan(data: { name: string; description: string; price: number; totalDids: number }) {
    const plan = await this.repo.createPlan(data)
    return plan;
  }

  async getPlans(): Promise<PlanosEntity[]> {
    const plans = await this.repo.getPlans();
    return plans;
  }
}
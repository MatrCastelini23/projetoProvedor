import { Repository } from "typeorm";
import PlanosEntity from "../models/PlanosEntity";



export interface IPlanosRepository {
  createPlan(data: Omit<PlanosEntity, "id" | "providers">): Promise<PlanosEntity>;
  getPlans(): Promise<PlanosEntity[]>;
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
        name: true,
        price: true,
        totalDids: true,
      }
    })
    return data ?? undefined
  }

}
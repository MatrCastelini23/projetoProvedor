import { Repository } from "typeorm";
import DidsEntity from "../models/DidsEntity.ts";


export interface IDidsRepository {
  createDid(data: Omit<DidsEntity, "id" | "providerClient">): Promise<DidsEntity>;
}

export class DidsRepository implements IDidsRepository {
  constructor(private readonly repo: Repository<DidsEntity>) { };

  async createDid(data: Omit<DidsEntity, "id" | "providerClient">): Promise<DidsEntity> {
    const input = this.repo.create(data);
    return await this.repo.save(input);
  }
}
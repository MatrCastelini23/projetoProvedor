import { Repository } from "typeorm";
import ProvidersClientEntity from "../models/ProviderClientEntity.ts";


export interface IProviderClientRepository {
  createProviderClient(data: Omit<ProvidersClientEntity, "id" | "dataCadastro" | "dids" | "provider">): Promise<ProvidersClientEntity>;
}

export class ProviderClientRepository implements IProviderClientRepository {
  constructor(private readonly repo: Repository<ProvidersClientEntity>) { };

  async createProviderClient(data: Omit<ProvidersClientEntity, "id" | "dataCadastro" | "dids" | "provider">): Promise<ProvidersClientEntity> {
    const input = this.repo.create(data);
    return await this.repo.save(input);
  }
}
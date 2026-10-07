import { Repository } from "typeorm";
import ProvidersEntity from "../models/ProviderEntity.js";


export interface IProviderRepository {
  createProvider(data: Omit<ProvidersEntity, "id" | "clients">): Promise<ProvidersEntity>;
  getProviders(): Promise<ProvidersEntity[]>;
  getProviderDetails(id: number): Promise<ProvidersEntity | null>;
}

export class ProviderRepository implements IProviderRepository {
  constructor(private readonly repo: Repository<ProvidersEntity>) { };

  async createProvider(data: Omit<ProvidersEntity, "id" | "clients">): Promise<ProvidersEntity> {
    const input = this.repo.create(data);
    const save = await this.repo.save(input);
    return (save);
  }

  async getProviders(): Promise<ProvidersEntity[]> {
    const data = await this.repo.find({
      select: {
        id: true,
        razaosocial: true,
        cnpj: true,
        phone: true,
        plano: true,
      },
      relations: { clients: true }
    });
    return data;
  }

  async getProviderDetails(id: number): Promise<ProvidersEntity | null> {
    const data = await this.repo.findOne({
      where: { id },
      relations: { clients: true }
    });
    return data ?? null;
  }
}
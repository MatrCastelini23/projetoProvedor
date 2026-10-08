import { Repository } from "typeorm";
import ProvidersEntity from "../models/ProviderEntity.js";


export interface IProviderRepository {
  createProvider(data: Omit<ProvidersEntity, "id" | "clients" | "plano">): Promise<ProvidersEntity>;
  getProviders(): Promise<ProvidersEntity[]>;
  getProviderDetails(id: number): Promise<ProvidersEntity | null>;
}

export class ProviderRepository implements IProviderRepository {
  constructor(private readonly repo: Repository<ProvidersEntity>) { };

  async createProvider(data: Omit<ProvidersEntity, "id" | "clients" | "plano"> & { planoId?: number | null }): Promise<ProvidersEntity> {
    const { planoId, ...providerData } = data;

    const input = this.repo.create({
      ...providerData,
      plano: planoId ? { id: planoId } : null,
    });
    const save = await this.repo.save(input);
    return save;
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
import { Repository } from "typeorm";
import ProvidersEntity from "../models/ProviderEntity.js";


export interface IProviderRepository {
  createProvider(data: Omit<ProvidersEntity, "id" | "clients" | "plano" | "dataCadastro">): Promise<ProvidersEntity>;
  getProviders(): Promise<ProvidersEntity[]>;
  getProviderDetails(id: number): Promise<ProvidersEntity | null>;
}

export class ProviderRepository implements IProviderRepository {
  constructor(private readonly repo: Repository<ProvidersEntity>) { };

  async createProvider(data: Omit<ProvidersEntity, "id" | "clients" | "plano" | "dataCadastro"> & { planoId?: number | null }): Promise<ProvidersEntity> {
    const input = this.repo.create(data);
    return await this.repo.save(input);
  }

  async getProviders(): Promise<ProvidersEntity[]> {
    const data = await this.repo.find({
      select: {
        id: true,
        razaosocial: true,
        cnpj: true,
        phone: true,
      },
      relations: { clients: true, plano: true }
    });
    const counts = await this.repo
      .createQueryBuilder('p')
      .leftJoin('p.clients', 'c')
      .leftJoin('c.dids', 'd')
      .select('p.id', 'providerId')
      .addSelect('COUNT(d.id)', 'total')
      .groupBy('p.id')
      .getRawMany<{ providerId: number; total: string }>();

    const countMap = new Map(counts.map((r) => [r.providerId, Number(r.total)]))
    return data.map((p) => ({
      ...p,
      didsEmUso: countMap.get(p.id) ?? 0,
    }));
  }

  async getProviderDetails(id: number): Promise<ProvidersEntity | null> {
    const data = await this.repo.findOne({
      where: { id },
      relations: {
        clients: {
          dids: true,
        }, plano: true
      }
    });
    return data ?? null;
  }
}
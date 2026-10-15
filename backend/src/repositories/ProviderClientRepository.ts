import { Repository } from "typeorm";
import ProvidersClientEntity from "../models/ProviderClientEntity.ts";
import { DidInput } from "../schemas/DidsSchemas.ts";
import DidsEntity from "../models/DidsEntity.ts";

type ClientData = Omit<ProvidersClientEntity, "id" | "dids" | "provider">;

export interface IProviderClientRepository {
  createProviderClient(data: ClientData): Promise<ProvidersClientEntity>;
  createProviderClientWithDids(data: ClientData, dids: DidInput[]): Promise<ProvidersClientEntity>;
}

export class ProviderClientRepository implements IProviderClientRepository {
  constructor(private readonly repo: Repository<ProvidersClientEntity>) { };

  async createProviderClient(data: ClientData): Promise<ProvidersClientEntity> {
    const input = this.repo.create(data);
    return await this.repo.save(input);
  }

  async createProviderClientWithDids(data: ClientData, dids: DidInput[]): Promise<ProvidersClientEntity> {
    return await this.repo.manager.transaction(async (manager) => {
      const clientRepo = manager.getRepository(ProvidersClientEntity);
      const didsRepo = manager.getRepository(DidsEntity);

      const client = await clientRepo.save(clientRepo.create(data));

      if (dids.length > 0) {
        const entities = didsRepo.create(
          dids.map((did) => ({ ...did, providersClientId: client.id }))
        );
        await didsRepo.save(entities);
      }
      return client;
    })
  }
}
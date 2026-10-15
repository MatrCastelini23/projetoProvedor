import ProvidersClientEntity from "../models/ProviderClientEntity.ts";
import { DidInput } from "../schemas/DidsSchemas.ts";
import { IProviderClientRepository } from "../repositories/ProviderClientRepository.ts";



type ClientData = Omit<ProvidersClientEntity, "id" | "dataCadastro" | "dids" | "provider">;


export class ProviderClientService {
  constructor(private readonly repo: IProviderClientRepository) { };

  async createProviderClient(data: ClientData, dids: DidInput[] = []) {
    return await this.repo.createProviderClientWithDids(
      { ...data, dataCadastro: new Date() },
      dids
    );
  }
}
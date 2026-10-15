import ProvidersClientEntity from "../models/ProviderClientEntity.ts";
import { IProviderClientRepository } from "../repositories/ProviderClientRepository.ts";



export class ProviderClientService {
  constructor(private readonly repo: IProviderClientRepository) { };

  async createProviderClient(data: Omit<ProvidersClientEntity, "id" | "dataCadastro" | "dids" | "provider">) {
    const providerClient = {
      ...data,
      dataCadastro: new Date(),
    }
    return await this.repo.createProviderClient(providerClient);
  }
}
import ProvidersEntity from "../models/ProviderEntity.js";
import { IProviderRepository } from "../repositories/provedorRepository.js";


export class ProvidersService {
  constructor(private readonly repo: IProviderRepository) { };

  async createProvider(data: Omit<ProvidersEntity, "id" | "clients" | "plano" | "dataCadastro">) {
    const provider = {
      ...data,
      dataCadastro: new Date(),
    }
    return await this.repo.createProvider(provider);
  }

  async getProviders(): Promise<ProvidersEntity[]> {
    const providers = await this.repo.getProviders();
    return providers;
  }

  async getProviderDetails(id: number): Promise<ProvidersEntity | null> {
    const idNumber = id;
    const provider = await this.repo.getProviderDetails(idNumber);
    return provider ?? null;
  }
}
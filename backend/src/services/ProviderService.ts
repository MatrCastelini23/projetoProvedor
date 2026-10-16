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

  async getProviderDetails(id: number): Promise<ProvidersEntity & { valorACobrar: number; valorExcedente: number } | null> {
    const idNumber = id;
    const provider = await this.repo.getProviderDetails(idNumber);

    if (!provider) return null;

    const { plano } = provider;

    if (!plano) {
      throw new Error(`Provedor não possui plano vinculado`);
    }

    const dids = (provider.clients ?? []).flatMap((client) => client.dids ?? []);
    const totalDidsNaBase = dids.length;

    let valorACobrar = 0;

    if (totalDidsNaBase > plano.totalDids) {
      valorACobrar = totalDidsNaBase * plano.valorExcedente;
    }

    const totalCanais = dids.reduce((soma, did) => soma + did.canais, 0);

    if (totalCanais > 5) {
      valorACobrar = totalCanais * plano.valorPorCanal + valorACobrar;
    }

    const valorExcedente = valorACobrar - plano.price;

    const valorRedondo = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;
    return {
      ...provider,
      valorACobrar: valorRedondo(valorACobrar),
      valorExcedente: valorRedondo(valorExcedente)
    };
  }
}
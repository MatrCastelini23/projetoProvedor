import "reflect-metadata";
import AppDataSource from "../data-source.js";
import DidsEntity from "../../models/DidsEntity.js";
import ProvidersClientEntity from "../../models/ProviderClientEntity.js";
import ProvidersEntity from "../../models/ProviderEntity.js";
import PlanosEntity from "../../models/PlanosEntity.js";

function at<T>(arr: T[], index: number): T {
  const item = arr[index];
  if (item === undefined) {
    throw new Error(`Índice ${index} não encontrado no array de seed.`);
  }
  return item;
}

async function seedPlanos(): Promise<PlanosEntity[]> {
  const planoRepo = AppDataSource.getRepository(PlanosEntity);

  const planosData: Partial<PlanosEntity>[] = [
    { name: "Básico", description: "Plano de entrada com recursos essenciais", price: 49.9, totalDids: 5 },
    { name: "Profissional", description: "Plano intermediário para pequenas equipes", price: 149.9, totalDids: 20 },
    { name: "Empresarial", description: "Plano para empresas com maior volume", price: 349.9, totalDids: 50 },
    { name: "Enterprise", description: "Plano completo sem limites de uso", price: 799.9, totalDids: 100 },
  ];

  const planos = planoRepo.create(planosData);
  return planoRepo.save(planos);
}

async function seedProviders(planos: PlanosEntity[]): Promise<ProvidersEntity[]> {
  const providerRepo = AppDataSource.getRepository(ProvidersEntity);

  const providersData: Partial<ProvidersEntity>[] = [
    {
      razaosocial: "Telecom Alfa Ltda",
      cnpj: "12345678000101", // Adicionado (max 14 caracteres)
      email: "contato@telecomalfa.com.br",
      phone: "11987654321",
      dataCadastro: new Date("2023-01-15"),
      plano: at(planos, 0),
    },
    {
      razaosocial: "Beta Comunicações S.A.",
      cnpj: "98765432000199", // Adicionado (max 14 caracteres)
      email: "contato@betacomunicacoes.com.br",
      phone: "21976543210",
      dataCadastro: new Date("2023-05-22"),
      plano: at(planos, 1),
    },
    {
      razaosocial: "Gamma Voz e Dados Ltda",
      cnpj: "45678912000188", // Adicionado (max 14 caracteres)
      email: "contato@gammavoz.com.br",
      phone: "31965432109",
      dataCadastro: new Date("2024-02-10"),
      plano: at(planos, 2),
    },
  ];

  const providers = providerRepo.create(providersData);
  return providerRepo.save(providers);
}

async function seedProvidersClient(providers: ProvidersEntity[]): Promise<ProvidersClientEntity[]> {
  const clientRepo = AppDataSource.getRepository(ProvidersClientEntity);

  const clientsData: Partial<ProvidersClientEntity>[] = [
    {
      razaosocial: "Cliente Norte Comércio Ltda",
      cnpjCpf: "11122233344", // Adicionado (max 14 caracteres)
      email: "financeiro@clientenorte.com.br",
      phone: "11912345678",
      dataCadastro: new Date("2023-03-01"),
      provider: at(providers, 0),
    },
    {
      razaosocial: "Cliente Sul Distribuidora S.A.",
      cnpjCpf: "22233344455", // Adicionado (max 14 caracteres)
      email: "contato@clientesul.com.br",
      phone: "21923456789",
      dataCadastro: new Date("2023-07-19"),
      provider: at(providers, 1),
    },
    {
      razaosocial: "Cliente Leste Serviços Ltda",
      cnpjCpf: "55566677788", // Adicionado (max 14 caracteres)
      email: "adm@clienteleste.com.br",
      phone: "31934567890",
      dataCadastro: new Date("2023-11-05"),
      provider: at(providers, 2),
    },
    {
      razaosocial: "Cliente Oeste Tecnologia Ltda",
      cnpjCpf: "99988877766", // Adicionado (max 14 caracteres)
      email: "suporte@clienteoeste.com.br",
      phone: "41945678901",
      dataCadastro: new Date("2024-04-12"),
      provider: at(providers, 0),
    },
  ];

  const clients = clientRepo.create(clientsData);
  return clientRepo.save(clients);
}

async function seedDids(clients: ProvidersClientEntity[]): Promise<DidsEntity[]> {
  const didsRepo = AppDataSource.getRepository(DidsEntity);

  const totalDids = 30;
  const didsData: Partial<DidsEntity>[] = [];

  for (let i = 0; i < totalDids; i++) {
    const client = at(clients, i % clients.length);
    const numero = (5511300000000 + i).toString().slice(0, 12); // garante max 12 caracteres

    didsData.push({
      dids: numero,
      canais: 2, // Adicionado (Quantidade fictícia de canais simultâneos)
      data_ativacao: new Date(), // Adicionado (Data de ativação fictícia)
      providerClient: client,
    });
  }

  const dids = didsRepo.create(didsData);
  return didsRepo.save(dids);
}

async function runSeeds() {
  try {
    await AppDataSource.initialize();
    console.log("Conexão com o banco estabelecida.");

    const planos = await seedPlanos();
    console.log(`${planos.length} planos criados.`);

    const providers = await seedProviders(planos);
    console.log(`${providers.length} providers criados.`);

    const clients = await seedProvidersClient(providers);
    console.log(`${clients.length} providersClient criados.`);

    const dids = await seedDids(clients);
    console.log(`${dids.length} dids criados.`);

    console.log("Seeds executadas com sucesso!");
  } catch (error) {
    console.error("Erro ao executar as seeds:", error);
  } finally {
    await AppDataSource.destroy();
  }
}

runSeeds();

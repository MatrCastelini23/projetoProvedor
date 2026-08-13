import "reflect-metadata";
import AppDataSource from "../data-source";
import DidsEntity from "../../models/DidsEntity";
import ProvidersClientEntity from "../../models/ProviderClientEntity";
import ProvidersEntity from "../../models/ProviderEntity";
import PlanosEntity from "../../models/PlanosEntity";

/**
 * Helper para acessar um índice de array com segurança de tipos.
 * Necessário por causa do "noUncheckedIndexedAccess" / "exactOptionalPropertyTypes",
 * que faz o TS tratar array[i] como T | undefined.
 */
function at<T>(arr: T[], index: number): T {
  const item = arr[index];
  if (item === undefined) {
    throw new Error(`Índice ${index} não encontrado no array de seed.`);
  }
  return item;
}

/**
 * Ordem de inserção respeitando as FKs:
 * 1. planos            (sem dependência)
 * 2. providers          -> depende de planos (plan_id)
 * 3. providersClient    -> depende de providers (provider_id)
 * 4. dids               -> depende de providersClient (providersClient_id)
 *
 * Ordem de limpeza é a inversa, para não violar constraint de FK.
 */

async function clearTables() {
  const didsRepo = AppDataSource.getRepository(DidsEntity);
  const clientRepo = AppDataSource.getRepository(ProvidersClientEntity);
  const providerRepo = AppDataSource.getRepository(ProvidersEntity);
  const planoRepo = AppDataSource.getRepository(PlanosEntity);

  await didsRepo.query('DELETE FROM "dids"');
  await clientRepo.query('DELETE FROM "providersClient"');
  await providerRepo.query('DELETE FROM "providers"');
  await planoRepo.query('DELETE FROM "planos"');
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
      email: "contato@telecomalfa.com.br",
      phone: "11987654321",
      dataCadastro: new Date("2023-01-15"),
      plano: at(planos, 0),
    },
    {
      razaosocial: "Beta Comunicações S.A.",
      email: "contato@betacomunicacoes.com.br",
      phone: "21976543210",
      dataCadastro: new Date("2023-05-22"),
      plano: at(planos, 1),
    },
    {
      razaosocial: "Gamma Voz e Dados Ltda",
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
      email: "financeiro@clientenorte.com.br",
      phone: "11912345678",
      dataCadastro: new Date("2023-03-01"),
      provider: at(providers, 0),
    },
    {
      razaosocial: "Cliente Sul Distribuidora S.A.",
      email: "contato@clientesul.com.br",
      phone: "21923456789",
      dataCadastro: new Date("2023-07-19"),
      provider: at(providers, 1),
    },
    {
      razaosocial: "Cliente Leste Serviços Ltda",
      email: "adm@clienteleste.com.br",
      phone: "31934567890",
      dataCadastro: new Date("2023-11-05"),
      provider: at(providers, 2),
    },
    {
      razaosocial: "Cliente Oeste Tecnologia Ltda",
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

    await clearTables();
    console.log("Tabelas limpas com sucesso.");

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
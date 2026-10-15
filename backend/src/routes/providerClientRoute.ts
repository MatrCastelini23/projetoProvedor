import { Router } from "express";
import { ProviderClientRepository } from "../repositories/ProviderClientRepository.ts";
import AppDataSource from "../database/data-source.ts";
import ProvidersClientEntity from "../models/ProviderClientEntity.ts";
import { ProviderClientService } from "../services/ProviderClientService.ts";
import { ProviderClientController } from "../controllers/ProviderClientController.ts";

const providerClientRoute = Router();

const providerClientRepository = new ProviderClientRepository(AppDataSource.getRepository(ProvidersClientEntity));
const providerClientService = new ProviderClientService(providerClientRepository);
const providerClientController = new ProviderClientController(providerClientService);

providerClientRoute.post("/createClient", providerClientController.newProviderClient);


export default providerClientRoute;
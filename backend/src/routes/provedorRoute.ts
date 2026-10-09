import { Router } from "express";
import { ProviderRepository } from "../repositories/provedorRepository.ts";
import AppDataSource from "../database/data-source.ts";
import ProvidersEntity from "../models/ProviderEntity.ts";
import { ProvidersService } from "../services/ProviderService.ts";
import { ProviderController } from "../controllers/ProviderController.ts";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.ts";



const providerRoute = Router();

const providerRepository = new ProviderRepository(AppDataSource.getRepository(ProvidersEntity));
const providerService = new ProvidersService(providerRepository);
const providerController = new ProviderController(providerService);

providerRoute.get("/providers", AuthMiddleware, providerController.listAllProviders);
providerRoute.get("/provider/:id", AuthMiddleware, providerController.getOneProvider);
providerRoute.post("/createProvider", AuthMiddleware, providerController.newProvider);

export default providerRoute; 
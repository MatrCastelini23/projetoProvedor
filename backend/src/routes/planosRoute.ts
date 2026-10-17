import { Router } from "express";
import { PlanosRepository } from "../repositories/planosRepository.js";
import AppDataSource from "../database/data-source.js";
import PlanosEntity from "../models/PlanosEntity.js";
import { PlanosService } from "../services/PlanosService.ts";
import { PlanosController } from "../controllers/PlanosController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";


const planRoute = Router();

const planRepository = new PlanosRepository(AppDataSource.getRepository(PlanosEntity));
const planService = new PlanosService(planRepository);
const planController = new PlanosController(planService);


planRoute.post("/v1/plan", AuthMiddleware, planController.newPlan);
planRoute.get("/v1/plan", AuthMiddleware, planController.listAllPlans);
planRoute.get("/v1/plan/:id", AuthMiddleware, planController.listOnePlan);
planRoute.patch("/v1/plan/:id", AuthMiddleware, planController.editPlan);

export default planRoute;
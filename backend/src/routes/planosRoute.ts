import { Router } from "express";
import { PlanosRepository } from "../repositories/planosRepository.js";
import AppDataSource from "../database/data-source.js";
import PlanosEntity from "../models/PlanosEntity.js";
import { PlanosService } from "../services/PlanosSerivice.js";
import { PlanosController } from "../controllers/PlanosController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.js";


const planRoute = Router();

const planRepository = new PlanosRepository(AppDataSource.getRepository(PlanosEntity));
const planService = new PlanosService(planRepository);
const planController = new PlanosController(planService);


planRoute.post("/createPlan", AuthMiddleware, planController.newPlan);
planRoute.get("/getPlans", AuthMiddleware, planController.listAllPlans);

export default planRoute;
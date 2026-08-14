import { Router } from "express";
import { PlanosRepository } from "../repositories/planosRepository";
import AppDataSource from "../database/data-source";
import PlanosEntity from "../models/PlanosEntity";
import { PlanosService } from "../services/PlanosSerivice";
import { PlanosController } from "../controllers/PlanosController";
import { AuthMiddleware } from "../middlewares/AuthMiddleware";


const planRoute = Router();

const planRepository = new PlanosRepository(AppDataSource.getRepository(PlanosEntity));
const planService = new PlanosService(planRepository);
const planController = new PlanosController(planService);


planRoute.post("/createPlan", AuthMiddleware, planController.newPlan);
planRoute.get("/getPlans", AuthMiddleware, planController.listAllPlans);

export default planRoute;
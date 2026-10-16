import { Router } from "express";
import { UserRepository } from "../repositories/userRepository.js";
import AppDataSource from "../database/data-source.js";
import { UsersEntity } from "../models/UsersEntity.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/UserController.js";
import { AuthMiddleware } from "../middlewares/AuthMiddleware.ts";

const userRoute = Router();

const userRepository = new UserRepository(AppDataSource.getRepository(UsersEntity));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.post("/newuser", AuthMiddleware, userController.newUser);
userRoute.post("/login", userController.loginUser);

export default userRoute;
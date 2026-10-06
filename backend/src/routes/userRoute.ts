import { Router } from "express";
import { UserRepository } from "../repositories/userRepository.js";
import AppDataSource from "../database/data-source.js";
import { UsersEntity } from "../models/UsersEntity.js";
import { UserService } from "../services/UserService.js";
import { UserController } from "../controllers/UserController.js";

const userRoute = Router();

const userRepository = new UserRepository(AppDataSource.getRepository(UsersEntity));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.post("/newuser", userController.newUser);
userRoute.post("/login", userController.loginUser);

export default userRoute;
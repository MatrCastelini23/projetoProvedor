import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import AppDataSource from "../database/data-source";
import { UsersEntity } from "../models/UsersEntity";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

const userRoute = Router();

const userRepository = new UserRepository(AppDataSource.getRepository(UsersEntity));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.post("/api/newuser", userController.newUser);
userRoute.post("/api/login", userController.loginUser);

export default userRoute;
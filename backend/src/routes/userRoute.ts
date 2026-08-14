import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import AppDataSource from "../database/data-source";
import { UsersEntity } from "../models/UserEntity";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

const userRoute = Router();

const userRepository = new UserRepository(AppDataSource.getRepository(UsersEntity));
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoute.post("/newuser", userController.newUser);
userRoute.post("/login", userController.loginUser);

export default userRoute;
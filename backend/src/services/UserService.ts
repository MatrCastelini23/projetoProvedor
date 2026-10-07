import * as bcrypt from "bcrypt";
import "dotenv/config"
import { IUserRepository } from "../repositories/userRepository.js";
import AppError from "../utils/AppError.js";
import { UserPublic, UsersEntity } from "../models/UsersEntity.js";
import jwt from "jsonwebtoken"

const ACCESS_TOKEN_KEY = process.env.JWT_SECRET;

export class UserService {
  constructor(private readonly repo: IUserRepository) { };

  async loginUser(data: { email: string, password: string }) {
    const user = await this.repo.getUserByEmail(data.email);

    if (!user) {
      throw new AppError(404, "Usuario não cadastrado")
    }

    const passwordPass = await bcrypt.compare(data.password, user.password);
    if (passwordPass === false) {
      throw new AppError(401, "Credendciais erradas");
    }
    const token = jwt.sign({ email: user.email }, ACCESS_TOKEN_KEY as string, { expiresIn: "1h", })
    return token;
  }

  async createUser(data: { name: string; email: string; password: string, acess: boolean }): Promise<UserPublic> {
    const emailExists = await this.repo.getUserByEmail(data.email);
    if (emailExists) {
      throw new AppError(409, "Não é possivel usar essas credenciais");
    }

    const passHash = await bcrypt.hash(data.password, 10);

    const dataUser = {
      name: data.name,
      email: data.email,
      password: passHash,
      acess: data.acess
    } as Omit<UsersEntity, "id">;

    const user = await this.repo.createUser(dataUser);

    const { password: _p, ...userPublic } = user;

    return userPublic;
  }
}
import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import z from "zod";
import AppError from "../utils/AppError";


export class UserController {
    constructor(private readonly serv: UserService) { };

    private schemaLogin = z.object({
        email: z.string().email(),
        password: z.string({ message: "Senha Obrigatoria" }),
    })

    private schemaCreate = z.object({
        name: z.string({ message: "Nome obrigatorio" }),
        email: z.string().email(),
        password: z.string({ message: "Senha obrigatoria" }),
    })

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = this.schemaLogin.parse(req.body);
            const login = await this.serv.loginUser(data);
            if (!login) {
                throw new AppError(404, "Erro ao logar");
            }
            const { password, ...loginNoPassword } = login;
            res.status(200).json({ message: "Usuario logado", loginNoPassword })
        } catch (error) {
            next(error);
        }
    }

    newUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = this.schemaCreate.parse(req.body);
            await this.serv.createUser(data);
            res.status(201).json({ message: "Usuario criado com sucesso !" })
        } catch (error) {
            next(error);
        }
    }
}
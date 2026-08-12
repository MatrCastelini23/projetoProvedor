import "dotenv/config"
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;

export interface IUserPayload {
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

export function AuthMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new AppError(403, "Nao autorizado")
  }

  try {
    const verifiedPayload = jwt.verify(token, ACCESS_TOKEN_KEY as string) as IUserPayload;

    req.user = verifiedPayload
    next();
  } catch (error) {
    res.status(403).json({ message: "Token invalido e expirado" })
  }
}; 
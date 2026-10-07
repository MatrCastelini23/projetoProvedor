import { Request, Response, NextFunction } from "express";
import { ProvidersService } from "../services/ProviderService.ts";
import z from "zod";
import AppError from "../utils/AppError.ts";


export class ProviderController {
  constructor(private readonly serv: ProvidersService) { };



  listAllProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.serv.getProviders();
      if (!data) {
        throw new AppError(404, "Sem provedores cadastrados")
      }
      res.status(200).json(data);
    } catch (error) {
      next(error)
    }
  }
}
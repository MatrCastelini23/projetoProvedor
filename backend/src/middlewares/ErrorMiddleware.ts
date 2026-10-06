import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import AppError from "../utils/AppError.js";




export function errorMiddleware(
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    if (error instanceof ZodError) {
        res.status(400).json({ error: "Data validation failed", details: error.issues });
    } else if (error instanceof AppError) {
        res.status(error.statusCode).json({ err: error.message });
    } else {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
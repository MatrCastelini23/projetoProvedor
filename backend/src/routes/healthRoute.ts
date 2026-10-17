import { Request, Response, NextFunction, Router } from "express";

const healthRoute = Router();


healthRoute.get("/v0/health", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ status: "ok" })
})


export default healthRoute;
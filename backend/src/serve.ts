import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import AppDataSource from "./database/data-source.js";
import userRoute from "./routes/userRoute.js";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";
import planRoute from "./routes/planosRoute.js";
import healthRoute from "./routes/healthRoute.ts";
import providerRoute from "./routes/provedorRoute.ts";


const server = express();
const PORT = process.env.PORT;
server.set("trust proxy", 1);
server.use(cors({ origin: process.env.CORS_ORIGIN?.split(",") ?? false }));
server.use(express.json());
server.use(userRoute);
server.use(planRoute);
server.use(providerRoute);
server.use(healthRoute);

server.use(errorMiddleware);

AppDataSource.initialize()
  .then(() => {
    console.log("DataBase connected");
  })
  .catch((error) => {
    console.error("Erro ao estabalidade conexão com o banco de dados: ", error);
  });

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
})

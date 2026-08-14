import "reflect-metadata";
import "dotenv/config";
import express from "express";
import cors from "cors";
import AppDataSource from "./database/data-source";
import userRoute from "./routes/userRoute";
import { errorMiddleware } from "./middlewares/ErrorMiddleware";
import planRoute from "./routes/planosRoute";


const server = express();
const PORT = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use(userRoute);
server.use(planRoute);

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

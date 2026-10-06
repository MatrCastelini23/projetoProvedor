import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "node:path";
import "dotenv/config"

const databaseHost = process.env.DB_HOST;
const databaseName = process.env.DB_NAME;
const databaseUserName = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;
const databasePort = process.env.DB_PORT;

const isProd = process.env.NODE_ENV === "production";
const ext = isProd ? "js" : "ts";
const baseDir = import.meta.dirname;

const AppDataSource = new DataSource({
  type: "mysql",
  host: databaseHost!,
  port: Number(databasePort)!,
  username: databaseUserName!,
  password: databasePassword!,
  database: databaseName!,
  entities: [path.join(baseDir, `../models/*.${ext}`)],
  synchronize: false,
  logging: true,
  migrations: [path.join(baseDir, `migrations/*.${ext}`)],
  migrationsRun: true,
})

export default AppDataSource;
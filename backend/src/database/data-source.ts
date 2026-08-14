import "reflect-metadata";
import { DataSource } from "typeorm";
import "dotenv/config"

const databaseHost = process.env.DB_HOST;
const databaseName = process.env.DB_NAME;
const databaseUserName = process.env.DB_USER;
const databasePassword = process.env.DB_PASSWORD;
const databasePort = process.env.DB_PORT;


const AppDataSource = new DataSource({
  type: "mysql",
  host: databaseHost!,
  port: Number(databasePort)!,
  username: databaseUserName!,
  password: databasePassword!,
  database: databaseName!,
  entities: ["src/models/*.ts"],
  synchronize: false,
  logging: true,
  migrations: ['./src/database/migrations/*.ts'],
  migrationsRun: true,
})

export default AppDataSource;
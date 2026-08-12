import "reflect-metadata";
import { DataSource } from "typeorm";


const AppDataSource = new DataSource({
  type: "better-sqlite3",
  database: './src/database/database.sqlite',
  entities: ["src/models/*.ts"],
  synchronize: false,
  logging: true,
  migrations: ['./src/database/migrations/*.ts'],
  migrationsRun: true,
})

export default AppDataSource;
import { DataSource } from "typeorm";
import { UsersEntity } from "../models/UserEntity";

export const AppDataSource = new DataSource({
    type: "better-sqlite3",
    database: './src/database/database.sqlite',
    entities: [UsersEntity],
    synchronize: true,
    logging: false,
    migrations: ['.src/database/migrations/*.ts'],
    migrationsRun: true,
})

export default AppDataSource;
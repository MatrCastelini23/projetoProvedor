import { Repository } from "typeorm";
import { UsersEntity } from "../models/UserEntity";


export interface IUserRepository {
    getUserByEmail(email: string): Promise<UsersEntity | undefined>;
    createUser(data: Omit<UsersEntity, "id">): Promise<UsersEntity>;
}

export class UserRepository implements IUserRepository {
    constructor(private readonly repo: Repository<UsersEntity>) { };

    async getUserByEmail(email: string): Promise<UsersEntity | undefined> {
        const data = await this.repo.findOne({ where: { email } });
        return data ?? undefined;
    }

    async createUser(data: Omit<UsersEntity, "id">): Promise<UsersEntity> {
        const input = this.repo.create(data);
        const save = await this.repo.save(input);
        return (save);
    }
}
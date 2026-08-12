import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "varchar", length: 100, })
  password!: string;
}

export type UserPublic = Omit<UsersEntity, "password">;
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import ProvidersEntity from "./ProviderEntity.js";

@Entity('planos')
export class PlanosEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  name!: string;

  @Column({ type: "varchar", length: 100 })
  description!: string;

  @Column({ type: "decimal", precision: 10, scale: 2, })
  price!: number;

  @Column({ type: "int" })
  totalDids!: number;

  @OneToMany(() => ProvidersEntity, (provider) => provider.plano)
  providers!: Relation<ProvidersEntity[]>;
}

export default PlanosEntity
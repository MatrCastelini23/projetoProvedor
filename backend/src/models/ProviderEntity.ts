import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import PlanosEntity from "./PlanosEntity.js";
import ProvidersClientEntity from "./ProviderClientEntity.js";

@Entity('providers')
export class ProvidersEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  razaosocial!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "varchar", length: 11 })
  phone!: string;

  @Column({ type: "date" })
  dataCadastro!: Date

  @ManyToOne(() => PlanosEntity, (plano) => plano.providers, { onDelete: "SET NULL" })
  @JoinColumn({ name: "plan_id" })
  plano!: Relation<PlanosEntity>

  @OneToMany(() => ProvidersClientEntity, (client) => client.provider)
  clients!: Relation<ProvidersClientEntity[]>;
}

export default ProvidersEntity;
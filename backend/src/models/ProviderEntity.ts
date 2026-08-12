import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import PlanosEntity from "./PlanosEntity";
import ProvidersClientEntity from "./ProviderClientEntity";

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
  plano!: PlanosEntity

  @OneToMany(() => ProvidersClientEntity, (client) => client.provider)
  clients!: ProvidersClientEntity[];
}

export default ProvidersEntity;
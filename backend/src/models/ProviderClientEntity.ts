import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import ProvidersEntity from "./ProviderEntity.js";
import { DidsEntity } from "./DidsEntity.js";

@Entity('providersClient')
export class ProvidersClientEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  razaosocial!: string;

  @Column({ type: "varchar", length: 14 })
  cnpjCpf!: string;

  @Column({ type: "varchar", length: 100 })
  email!: string;

  @Column({ type: "varchar", length: 11 })
  phone!: string;

  @Column({ type: "date" })
  dataCadastro!: Date

  @OneToMany(() => DidsEntity, (dids) => dids.providerClient)
  dids!: DidsEntity[];

  @ManyToOne(() => ProvidersEntity, (provider) => provider.clients, { onDelete: "SET NULL" })
  @JoinColumn({ name: "provider_id" })
  provider!: Relation<ProvidersEntity>;
}

export default ProvidersClientEntity;
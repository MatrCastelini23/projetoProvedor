import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from "typeorm";
import ProvidersClientEntity from "./ProviderClientEntity.js";


@Entity('dids')
export class DidsEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 12 })
  dids!: string;

  @ManyToOne(() => ProvidersClientEntity, (client) => client.dids, { onDelete: "CASCADE" })
  @JoinColumn({ name: "providersClient_id" })
  providerClient!: Relation<ProvidersClientEntity>;
}

export default DidsEntity;
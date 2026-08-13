import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { string } from "zod";
import ProvidersClientEntity from "./ProviderClientEntity";


@Entity('dids')
export class DidsEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 12 })
  dids!: string;

  @ManyToOne(() => ProvidersClientEntity, (client) => client.dids, { onDelete: "CASCADE" })
  @JoinColumn({ name: "providersClient_id" })
  providerClient!: ProvidersClientEntity;
}

export default DidsEntity;
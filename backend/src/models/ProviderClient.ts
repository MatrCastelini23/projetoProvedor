import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('providersClient')
export class ProvidersClientEntity {
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

  @Column({ type: "int" })
  id_provider!: number;
}

export default ProvidersClientEntity;
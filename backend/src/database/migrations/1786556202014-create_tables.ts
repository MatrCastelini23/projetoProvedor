import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1786556202014 implements MigrationInterface {
  name = 'CreateTables1786556202014'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "password" varchar(100) NOT NULL)`);
    await queryRunner.query(`CREATE TABLE "providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL)`);

    await queryRunner.query(`
            CREATE TABLE "providersClient" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, 
                "razaosocial" varchar(100) NOT NULL, 
                "email" varchar(100) NOT NULL, 
                "phone" varchar(11) NOT NULL, 
                "dataCadastro" date NOT NULL, 
                "id_provider" integer NOT NULL,
                FOREIGN KEY ("id_provider") REFERENCES "providers" ("id") ON DELETE CASCADE ON UPDATE CASCADE
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "providers"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "providersClient"`);
  }

}

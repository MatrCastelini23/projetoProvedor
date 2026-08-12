import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables21786575748679 implements MigrationInterface {
  name = 'CreateTables21786575748679'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "temporary_providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "id_provider" integer NOT NULL)`);
    await queryRunner.query(`INSERT INTO "temporary_providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "id_provider") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "id_provider" FROM "providersClient"`);
    await queryRunner.query(`DROP TABLE "providersClient"`);
    await queryRunner.query(`ALTER TABLE "temporary_providersClient" RENAME TO "providersClient"`);
    await queryRunner.query(`CREATE TABLE "planos" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(100) NOT NULL, "description" varchar(100) NOT NULL, "price" decimal(10,2) NOT NULL, "totalDids" integer NOT NULL)`);
    await queryRunner.query(`CREATE TABLE "temporary_providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "plano" integer NOT NULL)`);
    await queryRunner.query(`INSERT INTO "temporary_providers"("id", "razaosocial", "email", "phone", "dataCadastro") SELECT "id", "razaosocial", "email", "phone", "dataCadastro" FROM "providers"`);
    await queryRunner.query(`DROP TABLE "providers"`);
    await queryRunner.query(`ALTER TABLE "temporary_providers" RENAME TO "providers"`);


  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "providers" RENAME TO "temporary_providers"`);
    await queryRunner.query(`CREATE TABLE "providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL)`);
    await queryRunner.query(`INSERT INTO "providers"("id", "razaosocial", "email", "phone", "dataCadastro") SELECT "id", "razaosocial", "email", "phone", "dataCadastro" FROM "temporary_providers"`);
    await queryRunner.query(`DROP TABLE "temporary_providers"`);
    await queryRunner.query(`DROP TABLE "planos"`);
    await queryRunner.query(`ALTER TABLE "providersClient" RENAME TO "temporary_providersClient"`);
    await queryRunner.query(`CREATE TABLE "providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "id_provider" integer NOT NULL, CONSTRAINT "FK_fa9b838e14fa79bb432d40cba30" FOREIGN KEY ("id_provider") REFERENCES "providers" ("id") ON DELETE CASCADE ON UPDATE CASCADE)`);
    await queryRunner.query(`INSERT INTO "providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "id_provider") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "id_provider" FROM "temporary_providersClient"`);
    await queryRunner.query(`DROP TABLE "temporary_providersClient"`);
  }

}

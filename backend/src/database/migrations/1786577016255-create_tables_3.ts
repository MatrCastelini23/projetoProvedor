import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables31786577016255 implements MigrationInterface {
    name = 'CreateTables31786577016255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "plan_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_providers"("id", "razaosocial", "email", "phone", "dataCadastro", "plan_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "plano" FROM "providers"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`ALTER TABLE "temporary_providers" RENAME TO "providers"`);
        await queryRunner.query(`CREATE TABLE "temporary_providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "provider_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "temporary_providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "provider_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "id_provider" FROM "providersClient"`);
        await queryRunner.query(`DROP TABLE "providersClient"`);
        await queryRunner.query(`ALTER TABLE "temporary_providersClient" RENAME TO "providersClient"`);
        await queryRunner.query(`CREATE TABLE "temporary_providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "plan_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_providers"("id", "razaosocial", "email", "phone", "dataCadastro", "plan_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "plan_id" FROM "providers"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`ALTER TABLE "temporary_providers" RENAME TO "providers"`);
        await queryRunner.query(`CREATE TABLE "temporary_providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "provider_id" integer)`);
        await queryRunner.query(`INSERT INTO "temporary_providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "provider_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "provider_id" FROM "providersClient"`);
        await queryRunner.query(`DROP TABLE "providersClient"`);
        await queryRunner.query(`ALTER TABLE "temporary_providersClient" RENAME TO "providersClient"`);
        await queryRunner.query(`CREATE TABLE "temporary_providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "plan_id" integer, CONSTRAINT "FK_c5f71db3fd301bf41afe6280e1a" FOREIGN KEY ("plan_id") REFERENCES "planos" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_providers"("id", "razaosocial", "email", "phone", "dataCadastro", "plan_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "plan_id" FROM "providers"`);
        await queryRunner.query(`DROP TABLE "providers"`);
        await queryRunner.query(`ALTER TABLE "temporary_providers" RENAME TO "providers"`);
        await queryRunner.query(`CREATE TABLE "temporary_providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "provider_id" integer, CONSTRAINT "FK_8345649a85ca2e5645a8f30a402" FOREIGN KEY ("provider_id") REFERENCES "providers" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "provider_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "provider_id" FROM "providersClient"`);
        await queryRunner.query(`DROP TABLE "providersClient"`);
        await queryRunner.query(`ALTER TABLE "temporary_providersClient" RENAME TO "providersClient"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "providersClient" RENAME TO "temporary_providersClient"`);
        await queryRunner.query(`CREATE TABLE "providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "provider_id" integer)`);
        await queryRunner.query(`INSERT INTO "providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "provider_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "provider_id" FROM "temporary_providersClient"`);
        await queryRunner.query(`DROP TABLE "temporary_providersClient"`);
        await queryRunner.query(`ALTER TABLE "providers" RENAME TO "temporary_providers"`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "plan_id" integer)`);
        await queryRunner.query(`INSERT INTO "providers"("id", "razaosocial", "email", "phone", "dataCadastro", "plan_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "plan_id" FROM "temporary_providers"`);
        await queryRunner.query(`DROP TABLE "temporary_providers"`);
        await queryRunner.query(`ALTER TABLE "providersClient" RENAME TO "temporary_providersClient"`);
        await queryRunner.query(`CREATE TABLE "providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "provider_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "provider_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "provider_id" FROM "temporary_providersClient"`);
        await queryRunner.query(`DROP TABLE "temporary_providersClient"`);
        await queryRunner.query(`ALTER TABLE "providers" RENAME TO "temporary_providers"`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "plan_id" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "providers"("id", "razaosocial", "email", "phone", "dataCadastro", "plan_id") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "plan_id" FROM "temporary_providers"`);
        await queryRunner.query(`DROP TABLE "temporary_providers"`);
        await queryRunner.query(`ALTER TABLE "providersClient" RENAME TO "temporary_providersClient"`);
        await queryRunner.query(`CREATE TABLE "providersClient" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "id_provider" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "providersClient"("id", "razaosocial", "email", "phone", "dataCadastro", "id_provider") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "provider_id" FROM "temporary_providersClient"`);
        await queryRunner.query(`DROP TABLE "temporary_providersClient"`);
        await queryRunner.query(`ALTER TABLE "providers" RENAME TO "temporary_providers"`);
        await queryRunner.query(`CREATE TABLE "providers" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "razaosocial" varchar(100) NOT NULL, "email" varchar(100) NOT NULL, "phone" varchar(11) NOT NULL, "dataCadastro" date NOT NULL, "plano" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "providers"("id", "razaosocial", "email", "phone", "dataCadastro", "plano") SELECT "id", "razaosocial", "email", "phone", "dataCadastro", "plan_id" FROM "temporary_providers"`);
        await queryRunner.query(`DROP TABLE "temporary_providers"`);
    }

}

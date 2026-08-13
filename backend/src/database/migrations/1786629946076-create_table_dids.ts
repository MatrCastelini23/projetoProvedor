import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableDids1786629946076 implements MigrationInterface {
    name = 'CreateTableDids1786629946076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "dids" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dids" varchar(12) NOT NULL, "providersClient_id" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_dids" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dids" varchar(12) NOT NULL, "providersClient_id" integer, CONSTRAINT "FK_6e1e6fc9ed9072ca2d8e9c8a712" FOREIGN KEY ("providersClient_id") REFERENCES "providersClient" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_dids"("id", "dids", "providersClient_id") SELECT "id", "dids", "providersClient_id" FROM "dids"`);
        await queryRunner.query(`DROP TABLE "dids"`);
        await queryRunner.query(`ALTER TABLE "temporary_dids" RENAME TO "dids"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dids" RENAME TO "temporary_dids"`);
        await queryRunner.query(`CREATE TABLE "dids" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "dids" varchar(12) NOT NULL, "providersClient_id" integer)`);
        await queryRunner.query(`INSERT INTO "dids"("id", "dids", "providersClient_id") SELECT "id", "dids", "providersClient_id" FROM "temporary_dids"`);
        await queryRunner.query(`DROP TABLE "temporary_dids"`);
        await queryRunner.query(`DROP TABLE "dids"`);
    }

}

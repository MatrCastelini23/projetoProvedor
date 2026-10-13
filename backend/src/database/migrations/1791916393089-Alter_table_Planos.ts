import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePlanos1791916393089 implements MigrationInterface {
    name = 'AlterTablePlanos1791916393089'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`planos\` ADD \`valorPorCanal\` decimal(10,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`planos\` DROP COLUMN \`valorPorCanal\``);
    }

}

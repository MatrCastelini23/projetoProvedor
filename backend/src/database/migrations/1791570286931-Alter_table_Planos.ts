import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTablePlanos1791570286931 implements MigrationInterface {
    name = 'AlterTablePlanos1791570286931'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`planos\` ADD \`valorExcedente\` decimal(10,2) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`planos\` DROP COLUMN \`valorExcedente\``);
    }

}

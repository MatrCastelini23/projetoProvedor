import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableDids1791404638331 implements MigrationInterface {
    name = 'AlterTableDids1791404638331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dids\` ADD \`canais\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dids\` ADD \`data_ativacao\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dids\` DROP COLUMN \`data_ativacao\``);
        await queryRunner.query(`ALTER TABLE \`dids\` DROP COLUMN \`canais\``);
    }

}

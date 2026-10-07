import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTable11791385394018 implements MigrationInterface {
    name = 'AlterTable11791385394018'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`providers\` ADD \`cnpj\` varchar(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`providersClient\` ADD \`cnpjCpf\` varchar(14) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`acess\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`acess\``);
        await queryRunner.query(`ALTER TABLE \`providersClient\` DROP COLUMN \`cnpjCpf\``);
        await queryRunner.query(`ALTER TABLE \`providers\` DROP COLUMN \`cnpj\``);
    }

}

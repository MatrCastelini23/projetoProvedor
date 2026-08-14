import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables11786724245155 implements MigrationInterface {
    name = 'CreateTables11786724245155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`planos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`description\` varchar(100) NOT NULL, \`price\` decimal(10,2) NOT NULL, \`totalDids\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`providers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`razaosocial\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(11) NOT NULL, \`dataCadastro\` date NOT NULL, \`plan_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`dids\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dids\` varchar(12) NOT NULL, \`providersClient_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`providersClient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`razaosocial\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`phone\` varchar(11) NOT NULL, \`dataCadastro\` date NOT NULL, \`provider_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`providers\` ADD CONSTRAINT \`FK_c5f71db3fd301bf41afe6280e1a\` FOREIGN KEY (\`plan_id\`) REFERENCES \`planos\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`dids\` ADD CONSTRAINT \`FK_6e1e6fc9ed9072ca2d8e9c8a712\` FOREIGN KEY (\`providersClient_id\`) REFERENCES \`providersClient\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`providersClient\` ADD CONSTRAINT \`FK_8345649a85ca2e5645a8f30a402\` FOREIGN KEY (\`provider_id\`) REFERENCES \`providers\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`providersClient\` DROP FOREIGN KEY \`FK_8345649a85ca2e5645a8f30a402\``);
        await queryRunner.query(`ALTER TABLE \`dids\` DROP FOREIGN KEY \`FK_6e1e6fc9ed9072ca2d8e9c8a712\``);
        await queryRunner.query(`ALTER TABLE \`providers\` DROP FOREIGN KEY \`FK_c5f71db3fd301bf41afe6280e1a\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`providersClient\``);
        await queryRunner.query(`DROP TABLE \`dids\``);
        await queryRunner.query(`DROP TABLE \`providers\``);
        await queryRunner.query(`DROP TABLE \`planos\``);
    }

}

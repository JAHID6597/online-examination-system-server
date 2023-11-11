import { MigrationInterface, QueryRunner } from "typeorm";

export class AnswerMigrations1699570181005 implements MigrationInterface {
    name = 'AnswerMigrations1699570181005'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`answer\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` varchar(255) NULL, \`is_active\` tinyint NOT NULL DEFAULT 1, \`id\` varchar(36) NOT NULL, \`exam_id\` varchar(255) NOT NULL, \`question_id\` varchar(255) NOT NULL, \`selected_option_id\` varchar(255) NOT NULL, \`is_correct\` tinyint NOT NULL DEFAULT 0, \`candidate_id\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP FOREIGN KEY \`FK_4042dae35c3d747cb73d4e40cf6\``);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`examId\` \`examId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`option\` DROP FOREIGN KEY \`FK_b94517ccffa9c97ebb8eddfcae3\``);
        await queryRunner.query(`ALTER TABLE \`option\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`option\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`option\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` DROP FOREIGN KEY \`FK_80f29cc01d0bd1644e389cc13be\``);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_27622fbe99d85dc11b081f64a12\``);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD CONSTRAINT \`FK_4042dae35c3d747cb73d4e40cf6\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`option\` ADD CONSTRAINT \`FK_b94517ccffa9c97ebb8eddfcae3\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD CONSTRAINT \`FK_80f29cc01d0bd1644e389cc13be\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_27622fbe99d85dc11b081f64a12\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_27622fbe99d85dc11b081f64a12\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP FOREIGN KEY \`FK_80f29cc01d0bd1644e389cc13be\``);
        await queryRunner.query(`ALTER TABLE \`option\` DROP FOREIGN KEY \`FK_b94517ccffa9c97ebb8eddfcae3\``);
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP FOREIGN KEY \`FK_4042dae35c3d747cb73d4e40cf6\``);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_27622fbe99d85dc11b081f64a12\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`password\` \`password\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD CONSTRAINT \`FK_80f29cc01d0bd1644e389cc13be\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`option\` CHANGE \`questionId\` \`questionId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`option\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`option\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`option\` ADD CONSTRAINT \`FK_b94517ccffa9c97ebb8eddfcae3\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`examId\` \`examId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD CONSTRAINT \`FK_4042dae35c3d747cb73d4e40cf6\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP TABLE \`answer\``);
    }

}

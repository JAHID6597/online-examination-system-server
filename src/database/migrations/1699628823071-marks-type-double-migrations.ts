import { MigrationInterface, QueryRunner } from "typeorm";

export class MarksTypeDoubleMigrations1699628823071 implements MigrationInterface {
    name = 'MarksTypeDoubleMigrations1699628823071'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`positive_marks\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`positive_marks\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`negative_marks\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`negative_marks\` double NOT NULL DEFAULT '0'`);
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
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`duration\` \`duration\` time NULL`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP FOREIGN KEY \`FK_4042dae35c3d747cb73d4e40cf6\``);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP COLUMN \`positive_marks\``);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD \`positive_marks\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP COLUMN \`negative_marks\``);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD \`negative_marks\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`examId\` \`examId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`result\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`result\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`total_marks\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`total_marks\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`score\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`score\` double NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`option\` ADD CONSTRAINT \`FK_b94517ccffa9c97ebb8eddfcae3\` FOREIGN KEY (\`questionId\`) REFERENCES \`question\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`question\` ADD CONSTRAINT \`FK_80f29cc01d0bd1644e389cc13be\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` ADD CONSTRAINT \`FK_27622fbe99d85dc11b081f64a12\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD CONSTRAINT \`FK_4042dae35c3d747cb73d4e40cf6\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP FOREIGN KEY \`FK_4042dae35c3d747cb73d4e40cf6\``);
        await queryRunner.query(`ALTER TABLE \`exam\` DROP FOREIGN KEY \`FK_27622fbe99d85dc11b081f64a12\``);
        await queryRunner.query(`ALTER TABLE \`question\` DROP FOREIGN KEY \`FK_80f29cc01d0bd1644e389cc13be\``);
        await queryRunner.query(`ALTER TABLE \`option\` DROP FOREIGN KEY \`FK_b94517ccffa9c97ebb8eddfcae3\``);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`score\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`score\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`result\` DROP COLUMN \`total_marks\``);
        await queryRunner.query(`ALTER TABLE \`result\` ADD \`total_marks\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`result\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`result\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`examId\` \`examId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP COLUMN \`negative_marks\``);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD \`negative_marks\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` DROP COLUMN \`positive_marks\``);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD \`positive_marks\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam_details\` ADD CONSTRAINT \`FK_4042dae35c3d747cb73d4e40cf6\` FOREIGN KEY (\`examId\`) REFERENCES \`exam\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`exam\` CHANGE \`duration\` \`duration\` time NULL DEFAULT 'NULL'`);
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
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`negative_marks\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`negative_marks\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answer\` DROP COLUMN \`positive_marks\``);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD \`positive_marks\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`updated_by\` \`updated_by\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`answer\` CHANGE \`created_by\` \`created_by\` varchar(255) NULL DEFAULT 'NULL'`);
    }

}

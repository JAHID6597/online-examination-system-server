import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamModule } from '../exam/exam.module';
import { ResultModule } from '../result/result.module';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { AnswerEntity } from './entity/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerEntity]), ResultModule, ExamModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}

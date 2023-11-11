import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamDetailsModule } from '../exam-details/exam-details.module';
import { QuestionModule } from '../question/question.module';
import { UserModule } from '../user/user.module';
import { ExamEntity } from './entity/exam.entity';
import { ExamPublicController } from './exam-public.controller';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExamEntity]),
    ExamDetailsModule,
    UserModule,
    QuestionModule,
  ],
  controllers: [ExamController, ExamPublicController],
  providers: [ExamService],
  exports: [ExamService],
})
export class ExamModule {}

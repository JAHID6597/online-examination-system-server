import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamDetailsEntity } from './entity/exam-details.entity';
import { ExamDetailsService } from './exam-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([ExamDetailsEntity])],
  controllers: [],
  providers: [ExamDetailsService],
  exports: [ExamDetailsService],
})
export class ExamDetailsModule {}

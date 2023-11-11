import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntity } from './entity/result.entity';
import { ResultPublicController } from './result-public.controller';
import { ResultController } from './result.controller';
import { ResultService } from './result.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResultEntity])],
  controllers: [ResultController, ResultPublicController],
  providers: [ResultService],
  exports: [ResultService],
})
export class ResultModule {}

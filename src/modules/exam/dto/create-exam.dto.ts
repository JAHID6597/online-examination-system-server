import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { CreateExamDetailsDTO } from 'src/modules/exam-details/dto/create-exam-details.dto';
import { ExamDurationEnum } from '../enum/exam-duration.enum';

export class CreateExamDTO {
  @ApiProperty()
  @IsString()
  exam_name: string;

  @ApiProperty({ enum: ExamDurationEnum })
  @IsEnum(ExamDurationEnum)
  exam_duration_type: ExamDurationEnum;

  @ApiProperty()
  @IsString()
  duration: string;

  @ApiProperty({ type: CreateExamDetailsDTO, isArray: true })
  @Type(() => CreateExamDetailsDTO)
  @IsArray()
  @ValidateNested()
  selected_questions: CreateExamDetailsDTO[];
}

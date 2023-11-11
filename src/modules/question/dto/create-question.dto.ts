import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString, ValidateNested } from 'class-validator';
import { QuestionTypeEnum } from '../enum/question-type.enum';
import { CreateOptionDTO } from 'src/modules/option/dto/create-option.dto';
import { Type } from 'class-transformer';

export class CreateQuestionDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ enum: QuestionTypeEnum })
  @IsEnum(QuestionTypeEnum)
  type: QuestionTypeEnum;

  @ApiProperty({ type: CreateOptionDTO, isArray: true })
  @Type(() => CreateOptionDTO)
  @IsArray()
  @ValidateNested()
  options: CreateOptionDTO[];
}

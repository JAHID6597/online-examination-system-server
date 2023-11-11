import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsUUID, ValidateNested } from 'class-validator';

export class CreateAnswerDTO {
  @ApiProperty()
  @IsUUID()
  exam_id: string;

  @ApiProperty()
  @IsUUID()
  question_id: string;

  @ApiProperty()
  @IsUUID()
  selected_option_id: string;

  is_correct: boolean;

  @ApiProperty()
  @IsNumber()
  positive_marks: number;

  @ApiProperty()
  @IsNumber()
  negative_marks: number;

  @ApiProperty()
  @IsUUID()
  candidate_id: string;

  attempt_id: string;
}

export class CreateAnswerListDTO {
  @ApiProperty({ type: CreateAnswerDTO, isArray: true })
  @Type(() => CreateAnswerDTO)
  @IsArray()
  @ValidateNested()
  answer_list: CreateAnswerDTO[];
}

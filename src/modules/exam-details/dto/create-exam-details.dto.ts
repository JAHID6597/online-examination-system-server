import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateExamDetailsDTO {
  @ApiProperty()
  @IsString()
  question_id: string;

  @ApiProperty()
  @IsNumber()
  positive_marks: number;

  @ApiProperty()
  @IsNumber()
  negative_marks: number;

  @ApiProperty()
  @IsString()
  duration: string;
}

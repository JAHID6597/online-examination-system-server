import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

export class CreateOptionDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsBoolean()
  is_correct: boolean;
}

export class CreateOptionListDTO {
  @ApiProperty()
  @IsUUID()
  question_id: string;

  @ApiProperty({ type: CreateOptionDTO, isArray: true })
  @Type(() => CreateOptionDTO)
  @IsArray()
  @ValidateNested()
  options: CreateOptionDTO[];
}

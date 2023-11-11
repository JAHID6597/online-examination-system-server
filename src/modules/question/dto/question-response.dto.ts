import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum } from 'class-validator';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';
import { OptionResponseDTO } from 'src/modules/option/dto/option-response.dto';
import { QuestionTypeEnum } from '../enum/question-type.enum';

export class QuestionResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  title: string;

  @ApiResponseProperty({ enum: QuestionTypeEnum })
  @IsEnum(QuestionTypeEnum)
  type: QuestionTypeEnum;

  @ApiProperty({ type: OptionResponseDTO, isArray: true })
  @Type(() => OptionResponseDTO)
  options: OptionResponseDTO[];
}

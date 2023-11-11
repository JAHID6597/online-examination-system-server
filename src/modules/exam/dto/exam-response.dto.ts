import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';
import {
  ExamDetailsResponseDTO,
  ExamDetailsWithQuestionResponseDTO,
} from 'src/modules/exam-details/dto/exam-details-response.dto';

export class ExamResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  exam_name: string;

  @ApiProperty({ type: ExamDetailsResponseDTO, isArray: true })
  @Type(() => ExamDetailsResponseDTO)
  exams_details: ExamDetailsResponseDTO[];
}

export class ExamFullResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  exam_name: string;

  @ApiProperty({ type: ExamDetailsWithQuestionResponseDTO, isArray: true })
  @Type(() => ExamDetailsWithQuestionResponseDTO)
  exams_details: ExamDetailsWithQuestionResponseDTO[];
}

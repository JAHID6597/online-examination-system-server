import { ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';
import { QuestionResponseDTO } from 'src/modules/question/dto/question-response.dto';

export class ExamDetailsResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  exam_id: string;

  @ApiResponseProperty()
  question_id: string;

  @ApiResponseProperty()
  positive_marks: number;

  @ApiResponseProperty()
  negative_marks: number;

  @ApiResponseProperty()
  duration: string;
}

export class ExamDetailsWithQuestionResponseDTO extends ExamDetailsResponseDTO {
  @ApiResponseProperty({ type: QuestionResponseDTO })
  @Type(() => QuestionResponseDTO)
  question: QuestionResponseDTO;
}

import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseResponseDTO } from 'src/common/dto/base-response.dto';

export class AnswerResponseDTO extends BaseResponseDTO {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  exam_id: string;

  @ApiResponseProperty()
  question_id: string;

  @ApiResponseProperty()
  selected_option_id: string;

  @ApiResponseProperty()
  is_correct: boolean;

  @ApiResponseProperty()
  positive_marks: number;

  @ApiResponseProperty()
  negative_marks: number;

  @ApiResponseProperty()
  candidate_id: string;

  @ApiResponseProperty()
  attempt_id: string;
}

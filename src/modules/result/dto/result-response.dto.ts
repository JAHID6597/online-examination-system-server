import { ApiResponseProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../shared/entity/base.entity';

export class ResultResponseDTO extends BaseEntity {
  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  exam_id: string;

  @ApiResponseProperty()
  total_questions: number;

  @ApiResponseProperty()
  correct_answers: number;

  @ApiResponseProperty()
  total_marks: number;

  @ApiResponseProperty()
  score: number;

  @ApiResponseProperty()
  candidate_id: string;

  @ApiResponseProperty()
  attempt_id: string;
}

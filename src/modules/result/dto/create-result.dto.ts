import { AnswerResponseDTO } from 'src/modules/answer/dto/answer-response.dto';
import { QuestionResponseDTO } from 'src/modules/question/dto/question-response.dto';
import { ExamFullResponseDTO } from './../../exam/dto/exam-response.dto';

export class CreateResultDTO {
  exam: ExamFullResponseDTO;

  mappedQuestions: Map<string, QuestionResponseDTO>;

  questions: QuestionResponseDTO[];

  answers: AnswerResponseDTO[];
}

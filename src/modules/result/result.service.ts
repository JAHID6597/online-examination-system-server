import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonUtils } from 'src/common/utils/common.utils';
import { Repository } from 'typeorm';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { CreateResultDTO } from './dto/create-result.dto';
import { ResultEntity } from './entity/result.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(ResultEntity)
    private readonly resultRepository: Repository<ResultEntity>,
  ) {}

  public findOneBy(key: string, value: any) {
    return this.resultRepository.findOneBy({ [key]: value });
  }

  public findBy(key: string, value: any) {
    return this.resultRepository.findBy({ [key]: value });
  }

  public findAll() {
    return this.resultRepository.find();
  }

  public async createResult(item: CreateResultDTO, user: UserPayload) {
    const totalQuestions = item.questions.length;
    const totalMarks = CommonUtils.getSum(
      item.exam.exams_details,
      'positive_marks',
    );
    let score = 0,
      correctAnswers = 0;

    const mappedExamDetailsByQuestion = CommonUtils.getMapped(
      item.exam.exams_details,
      'question_id',
    );

    const groupedAnswerByQuestion = CommonUtils.groupBy(
      item.answers,
      'question_id',
    );
    for (const questionId in groupedAnswerByQuestion) {
      const correctOptionIds = item.mappedQuestions
        .get(questionId)
        .options.filter((i) => i.is_correct)
        .map((i) => i.id);
      const answerOptionIds = groupedAnswerByQuestion[questionId].map(
        (i) => i.selected_option_id,
      );

      const isCorrectAns = CommonUtils.bothArraysAreEqual(
        correctOptionIds,
        answerOptionIds,
      );
      if (isCorrectAns) {
        score += mappedExamDetailsByQuestion.get(questionId).positive_marks;
        correctAnswers++;
      } else
        score -= mappedExamDetailsByQuestion.get(questionId).negative_marks;
    }

    const result = this.resultRepository.create();
    result.exam_id = item.exam.id;
    result.total_questions = totalQuestions;
    result.correct_answers = correctAnswers;
    result.total_marks = totalMarks;
    result.score = score;
    result.candidate_id = item.answers[0].candidate_id;
    result.attempt_id = item.answers[0].attempt_id;
    result.created_by = user.user_id;
    return this.resultRepository.save(result);
  }
}

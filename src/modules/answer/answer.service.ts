import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonUtils } from 'src/common/utils/common.utils';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ExamService } from '../exam/exam.service';
import { QuestionResponseDTO } from '../question/dto/question-response.dto';
import { CreateResultDTO } from '../result/dto/create-result.dto';
import { ResultService } from '../result/result.service';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { CreateAnswerDTO, CreateAnswerListDTO } from './dto/create-answer.dto';
import { AnswerEntity } from './entity/answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
    private readonly resultService: ResultService,
    private readonly examService: ExamService,
  ) {}

  public findOneBy(key: string, value: any) {
    return this.answerRepository.findOneBy({ [key]: value });
  }

  public findBy(key: string, value: any) {
    return this.answerRepository.findBy({ [key]: value });
  }

  public async createAnswers(body: CreateAnswerListDTO, user: UserPayload) {
    const answers = [];
    const attemptId = uuid();

    const exam = await this.examService.findExamQuestionDetails(
      body.answer_list[0].exam_id,
    );

    const questions = exam.exams_details.map((details) => details.question);
    const mappedQuestions = CommonUtils.getMapped(questions, 'id');
    const mappedQuestionsOptions =
      this.getMappedQuestionsOptions(mappedQuestions);

    for (const item of body.answer_list) {
      item.attempt_id = attemptId;
      item.is_correct = mappedQuestionsOptions[item.question_id].get(
        item.selected_option_id,
      ).is_correct;
      const answer = await this.createAnswer(item, user);

      answers.push(answer);
    }

    return await this.resultService.createResult(
      { exam, mappedQuestions, questions, answers } as CreateResultDTO,
      user,
    );
  }

  private getMappedQuestionsOptions(
    mappedQuestions: Map<string, QuestionResponseDTO>,
  ) {
    const mappedQuestionsOptions = {};
    for (const questionId in Object.fromEntries(mappedQuestions)) {
      if (!mappedQuestionsOptions[questionId]) {
        mappedQuestionsOptions[questionId] = {};
      }

      const options = mappedQuestions.get(questionId).options;
      const mappedOptions = CommonUtils.getMapped(options, 'id');
      mappedQuestionsOptions[questionId] = mappedOptions;
    }
    return mappedQuestionsOptions;
  }

  public createAnswer(item: CreateAnswerDTO, user: UserPayload) {
    const answer = this.answerRepository.create(item);
    answer.created_by = user.user_id;
    return this.answerRepository.save(answer);
  }
}

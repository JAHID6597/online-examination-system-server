import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OptionService } from '../option/option.service';
import { UserRoleEnum } from '../user/enum/user-role.enum';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { UserService } from '../user/user.service';
import { CreateQuestionDTO } from './dto/create-question.dto';
import { QuestionResponseDTO } from './dto/question-response.dto';
import { QuestionEntity } from './entity/question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    private readonly optionService: OptionService,
    private readonly userService: UserService,
  ) {}

  public findOneBy(key: string, value: any) {
    return this.questionRepository.findOneBy({ [key]: value });
  }

  public findAll() {
    return this.questionRepository.find({
      relations: ['options'],
    });
  }

  public async findAllDetails(user: UserPayload) {
    const questions = await this.findAll();

    if (user.role === UserRoleEnum.CANDIDATE) {
      return this.removeCorrectOptions(questions);
    }

    return questions;
  }

  public async createQuestion(body: CreateQuestionDTO, authUser: UserPayload) {
    const user = await this.userService.findOneBy('id', authUser.user_id);

    const question = this.questionRepository.create(body);
    question.user = user;
    question.created_by = authUser.user_id;
    const newQuestion = await this.questionRepository.save(question);

    const optionsBody = {
      question_id: newQuestion.id,
      options: body.options,
    };
    const options = await this.optionService.createOptions(
      optionsBody,
      newQuestion,
      authUser,
    );

    const questionResponse: QuestionResponseDTO = {
      ...newQuestion,
      options: options,
    };
    return questionResponse;
  }

  public getDetailsByIds(ids: string[]) {
    return this.questionRepository
      .createQueryBuilder('question')
      .where('question.id IN (:...ids)', { ids })
      .leftJoinAndSelect('question.options', 'options')
      .getMany();
  }

  public async getFullDetailsByIds(ids: string[], user?: UserPayload) {
    const questions = await this.getDetailsByIds(ids);

    if (user?.role === UserRoleEnum.CANDIDATE) {
      return this.removeCorrectOptions(questions);
    }

    return questions;
  }

  public removeCorrectOptions(questions: QuestionEntity[]) {
    questions.forEach((question) => {
      question.options.forEach((option) => delete option.is_correct);
    });

    return questions;
  }
}

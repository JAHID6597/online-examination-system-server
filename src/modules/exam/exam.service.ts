import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonUtils } from 'src/common/utils/common.utils';
import { Repository } from 'typeorm';
import { ExamDetailsService } from '../exam-details/exam-details.service';
import { QuestionService } from '../question/question.service';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { UserService } from '../user/user.service';
import { CreateExamDTO } from './dto/create-exam.dto';
import { ExamFullResponseDTO, ExamResponseDTO } from './dto/exam-response.dto';
import { ExamEntity } from './entity/exam.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(ExamEntity)
    private readonly examRepository: Repository<ExamEntity>,
    private readonly examDetailsService: ExamDetailsService,
    private readonly userService: UserService,
    private readonly questionService: QuestionService,
  ) {}

  public findOneBy(key: string, value: any) {
    return this.examRepository.findOneBy({ [key]: value });
  }

  public findOneDetailsBy(key: string, value: any) {
    return this.examRepository.findOne({
      where: { [key]: value },
      relations: ['exams_details'],
    });
  }

  public async findExamQuestionDetails(id: string, authUser?: UserPayload) {
    const exam = await this.findOneDetailsBy('id', id);

    const questionIds = exam.exams_details.map(
      (details) => details.question_id,
    );
    const questions = await this.questionService.getFullDetailsByIds(
      questionIds,
      authUser,
    );
    const mappedQUestions = CommonUtils.getMapped(questions, 'id');

    exam.exams_details = exam.exams_details.map((details) => ({
      ...details,
      question: mappedQUestions.get(details.question_id),
    }));

    return exam as unknown as ExamFullResponseDTO;
  }

  public findAll() {
    return this.examRepository.find({ relations: ['exams_details'] });
  }

  public findAllBy(key: string, value: any) {
    return this.examRepository.find({
      where: { [key]: value },
      relations: ['exams_details'],
    });
  }

  public async createExam(body: CreateExamDTO, authUser: UserPayload) {
    const user = await this.userService.findOneBy('id', authUser.user_id);
    const exam = this.examRepository.create(body);
    exam.created_by = authUser.user_id;
    exam.user = user;
    const newExam = await this.examRepository.save(exam);

    const examDetails = await this.examDetailsService.createExamDetails(
      body.selected_questions,
      newExam,
      authUser,
    );

    const examResponse: ExamResponseDTO = {
      ...newExam,
      exams_details: examDetails,
    };
    return examResponse;
  }
}

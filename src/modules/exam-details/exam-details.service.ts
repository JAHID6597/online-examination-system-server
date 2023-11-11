import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamEntity } from '../exam/entity/exam.entity';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { CreateExamDetailsDTO } from './dto/create-exam-details.dto';
import { ExamDetailsEntity } from './entity/exam-details.entity';

@Injectable()
export class ExamDetailsService {
  constructor(
    @InjectRepository(ExamDetailsEntity)
    private readonly examRepository: Repository<ExamDetailsEntity>,
  ) {}

  public findOneBy(key: string, value: any) {
    return this.examRepository.findOneBy({ [key]: value });
  }

  public async createExamDetails(
    body: CreateExamDetailsDTO[],
    exam: ExamEntity,
    user: UserPayload,
  ) {
    const examsDetails = [];
    for (const item of body) {
      const details = await this.createDetails(item, exam, user);
      examsDetails.push(details);
    }

    return examsDetails;
  }

  public createDetails(
    body: CreateExamDetailsDTO,
    exam: ExamEntity,
    user: UserPayload,
  ) {
    const details = this.examRepository.create(body);
    details.exam_id = exam.id;
    details.exam = exam;
    details.created_by = user.user_id;
    return this.examRepository.save(details);
  }
}

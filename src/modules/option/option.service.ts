import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPayload } from '../user/user-auth/dto/user-payload.dto';
import { OptionEntity } from './entity/option.entity';
import { CreateOptionDTO, CreateOptionListDTO } from './dto/create-option.dto';
import { QuestionEntity } from '../question/entity/question.entity';

@Injectable()
export class OptionService {
  constructor(
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
  ) {}

  public findOneBy(key: string, value: any) {
    return this.optionRepository.findOneBy({ [key]: value });
  }

  public async createOptions(
    body: CreateOptionListDTO,
    question: QuestionEntity,
    user: UserPayload,
  ) {
    const options = [];
    for (const item of body.options) {
      const option = await this.createOption(item, question, user);
      options.push(option);
    }

    return options;
  }

  public createOption(
    item: CreateOptionDTO,
    question: QuestionEntity,
    user: UserPayload,
  ) {
    const option = this.optionRepository.create(item);
    option.question_id = question.id;
    option.question = question;
    option.created_by = user.user_id;
    return this.optionRepository.save(option);
  }
}

import { OptionEntity } from 'src/modules/option/entity/option.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';
import { QuestionTypeEnum } from '../enum/question-type.enum';

@Entity('question')
export class QuestionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: QuestionTypeEnum,
    default: QuestionTypeEnum.SINGLE_CHOICE,
  })
  type: QuestionTypeEnum;

  @ManyToOne(() => UserEntity, (user) => user.questions)
  user: UserEntity;

  @OneToMany(() => OptionEntity, (option) => option.question)
  options: OptionEntity[];
}

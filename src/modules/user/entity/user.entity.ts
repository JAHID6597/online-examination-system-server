import { ExamEntity } from 'src/modules/exam/entity/exam.entity';
import { QuestionEntity } from 'src/modules/question/entity/question.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';
import { UserRoleEnum } from '../enum/user-role.enum';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.CANDIDATE,
  })
  role: UserRoleEnum;

  @OneToMany(() => QuestionEntity, (question) => question.user)
  questions: QuestionEntity[];

  @OneToMany(() => ExamEntity, (exam) => exam.user)
  exams: ExamEntity[];
}

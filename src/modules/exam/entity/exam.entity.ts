import { ExamDetailsEntity } from 'src/modules/exam-details/entity/exam-details.entity';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';
import { ExamDurationEnum } from '../enum/exam-duration.enum';

@Entity('exam')
export class ExamEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exam_name: string;

  @Column({
    type: 'enum',
    enum: ExamDurationEnum,
    default: ExamDurationEnum.FULL_EXAM,
  })
  exam_duration_type: ExamDurationEnum;

  @Column({ type: 'varchar', nullable: true })
  duration: string;

  @ManyToOne(() => UserEntity, (user) => user.exams)
  user: UserEntity;

  @OneToMany(() => ExamDetailsEntity, (exam) => exam.exam)
  exams_details: ExamDetailsEntity[];
}

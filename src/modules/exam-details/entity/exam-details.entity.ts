import { ExamEntity } from 'src/modules/exam/entity/exam.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';

@Entity('exam_details')
export class ExamDetailsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exam_id: string;

  @Column()
  question_id: string;

  @Column({ type: 'double', default: 0 })
  positive_marks: number;

  @Column({ type: 'double', default: 0 })
  negative_marks: number;

  @Column({ type: 'varchar', nullable: true })
  duration: string;

  @ManyToOne(() => ExamEntity, (exam) => exam.exams_details)
  exam: ExamEntity;
}

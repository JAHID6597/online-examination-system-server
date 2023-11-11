import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';

@Entity('result')
export class ResultEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exam_id: string;

  @Column({ type: 'int', default: 0 })
  total_questions: number;

  @Column({ type: 'int', default: 0 })
  correct_answers: number;

  @Column({ type: 'double', default: 0 })
  total_marks: number;

  @Column({ type: 'double', default: 0 })
  score: number;

  @Column()
  candidate_id: string;

  @Column()
  attempt_id: string;
}

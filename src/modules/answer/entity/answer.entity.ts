import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../shared/entity/base.entity';

@Entity('answer')
export class AnswerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  exam_id: string;

  @Column()
  question_id: string;

  @Column()
  selected_option_id: string;

  @Column({ type: 'boolean', default: false })
  is_correct: boolean;

  @Column({ type: 'double', default: 0 })
  positive_marks: number;

  @Column({ type: 'double', default: 0 })
  negative_marks: number;

  @Column()
  candidate_id: string;

  @Column()
  attempt_id: string;
}

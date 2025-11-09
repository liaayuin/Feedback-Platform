import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('feedback')
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  company: string;

  @Column()
  message: string;

  @Column({ default: 'other' })
  gender: string;

  @Column({ default: 0 })
  upvotes: number;

  @Column({ default: 0 })
  downvotes: number;

  @Column('simple-array', { default: [] })
  voters: string[];

  @Column({ default: 'pending' })
  status: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

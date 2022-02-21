import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BoardStatus } from './board.model';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  //   @Column({ enum: [BoardStatus.PRIVATE, BoardStatus.PUBLIC] })
  @Column()
  status: BoardStatus;
}

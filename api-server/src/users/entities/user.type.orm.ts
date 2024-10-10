import { BaseEntity } from 'src/dbcontext/contracts/base.entety.itnerface';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserOrm implements BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  age: number;
}

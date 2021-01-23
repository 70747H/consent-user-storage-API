import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany, PrimaryGeneratedColumn, Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '../events/event.entity';
import { UserConsents } from '../user-consents/user-consents.entity';

@Unique(['email'])
@Entity({name: 'users'})
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'email', nullable: false})
  email: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn ({name: 'updated_at'})
  updatedAt: string;

  @DeleteDateColumn ({name: 'deleted_at'})
  deletedAt?: string;

  @OneToMany(() => UserConsents, userConsents => userConsents.user)
  consents: UserConsents[];

  @OneToMany(() => Event, event => event.user)
  events: Event[];
}

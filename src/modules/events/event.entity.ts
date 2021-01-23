import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../users/user.entity';

@Entity({name: 'events'})
export class Event {

  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'consents', type: 'json', nullable: false})
  consents: [{ id: string, enabled: boolean }];

  @Exclude()
  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @Exclude()
  @UpdateDateColumn ({name: 'updated_at'})
  updatedAt: string;

  @Exclude()
  @DeleteDateColumn ({name: 'deleted_at'})
  deletedAt?: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.events)
  @JoinColumn({name: 'user_id', referencedColumnName: 'id' })
  user: User;

  constructor(partial: Partial<Event>) {
    Object.assign(this, partial);
  }
}

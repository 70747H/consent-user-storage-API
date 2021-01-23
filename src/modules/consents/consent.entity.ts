import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, OneToMany, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserConsents } from '../user-consents/user-consents.entity';

@Entity({name: 'consents'})
export class Consent {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'name', nullable: false})
  name: string;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn ({name: 'updated_at'})
  updatedAt: string;

  @DeleteDateColumn ({name: 'deleted_at'})
  deletedAt?: string;

  @OneToMany(() => UserConsents, userConsent => userConsent.consent)
  consents: UserConsents[];
}

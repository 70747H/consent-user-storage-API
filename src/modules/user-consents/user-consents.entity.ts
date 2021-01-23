import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '../users/user.entity';
import { Consent } from '../consents/consent.entity';

@Entity({name: 'user-consents'})
export class UserConsents {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'enabled', default: false})
  enabled: boolean;

  @CreateDateColumn({name: 'created_at'})
  createdAt: string;

  @UpdateDateColumn ({name: 'updated_at'})
  updatedAt: string;

  @DeleteDateColumn ({name: 'deleted_at'})
  deletedAt?: string;

  @Column({ name: 'consent_id' })
  consentId: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => User, user => user.consents)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Consent, consent => consent.consents)
  @JoinColumn({name: 'consent_id', referencedColumnName: 'id' })
  consent: Consent;
}

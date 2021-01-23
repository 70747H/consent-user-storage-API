import { EntityRepository, Repository } from 'typeorm';
import { UserConsents } from './user-consents.entity';

@EntityRepository(UserConsents)
export class UserConsentRepository extends Repository<UserConsents> {}
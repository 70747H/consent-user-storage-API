import { EntityRepository, Repository } from 'typeorm';
import { Consent } from './consent.entity';

@EntityRepository(Consent)
export class ConsentRepository extends Repository<Consent> {}
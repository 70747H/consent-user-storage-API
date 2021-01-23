import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { ConsentRepository } from '../../modules/consents/consent.repository';
import { ConsentsSeed } from '../seeds/consents.seed';
import { Consent } from '../../modules/consents/consent.entity';

export class SeedConsents1611253401960 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.getRepository(Consent).createQueryBuilder()
          .insert()
          .into(Consent)
          .values(ConsentsSeed)
          .orIgnore()
          .execute();
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await getRepository(ConsentRepository).delete(ConsentsSeed);
    }

}

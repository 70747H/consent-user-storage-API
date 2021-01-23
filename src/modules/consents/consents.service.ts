import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable} from '@nestjs/common';
import { Consent } from './consent.entity';
import { CreateConsentsDto } from './dto/create-consent.dto';
import { UpdateConsentDto } from './dto/update-consent.dto';

@Injectable()
export class ConsentsService {
  constructor(
    @InjectRepository(Consent)
    private consentRepository: Repository<Consent>,
  ) {}

  createConsent = async (createConsentsDto: CreateConsentsDto) => {
    return await this.consentRepository.save(createConsentsDto);
  }

  findConsent = async (query: any) => {
    return this.consentRepository.findOneOrFail({ where: query });
  }

  listAllConsent = async (query: any, offset, limit, sort) => {
    return this.consentRepository.findAndCount({where: query, skip: offset, take: limit, order: sort});
  }

  updateConsent = async (id: string, updateConsentDto: UpdateConsentDto) => {
    return this.consentRepository.update({ id }, { ...updateConsentDto });
  }

  removeConsent = async (id: string) => {
    await this.consentRepository.findOneOrFail({ where: { id } });
    return this.consentRepository.softDelete({ id });
  }
}

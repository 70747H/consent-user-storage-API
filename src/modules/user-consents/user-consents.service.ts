import { Repository } from 'typeorm';
import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConsents } from './user-consents.entity';
import { CreateUserConsentsDto } from './dto/create-user-consents.dto';
import { UpdateUserConsentsDto } from './dto/update-user-consents.dto';
import { UserConsentRepository } from './user-consents.repository';

@Injectable()
export class UserConsentsService {
  constructor(
    @InjectRepository(UserConsentRepository)
    private usersConsentRepository: Repository<UserConsents>,
  ) {}

  createUserConsent = async (createUserConsentsDto: CreateUserConsentsDto) => {
    return await this.usersConsentRepository.save(createUserConsentsDto);
  }

  findUserConsent = async (query: any) => {
    return this.usersConsentRepository.findOne({ where: query, relations: ['user'] });
  }

  listAllUserConsents = async (query: any, offset, limit, sort) => {
    return this.usersConsentRepository.findAndCount({where: query, skip: offset, take: limit, order: sort, relations: ['user']});
  }

  updateUserConsent = async (id: string, updateUserConsentsDto: UpdateUserConsentsDto) => {
    return this.usersConsentRepository.update({ id }, { ...updateUserConsentsDto });
  }

  removeUserConsent = async (id: string) => {
    await this.usersConsentRepository.findOneOrFail({ where: { id } });
    return this.usersConsentRepository.softDelete({ id });
  }
}

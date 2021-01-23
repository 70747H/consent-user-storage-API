import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
  }

  createUser = async (createUsersDto: CreateUserDto) => {
    return await this.usersRepository.save(createUsersDto);
  }

  findUser = async (id: string): Promise<User> => {
    return this.usersRepository.findOneOrFail({ where: { id }, relations: ['consents', 'consents.consent'] });
  }

  listAllUsers = async (query: any, offset, limit, sort) => {
    return this.usersRepository.findAndCount({
      where: query,
      skip: offset,
      take: limit,
      order: sort,
      relations: ['consents', 'consents.consent'],
    });
  }

  updateUser = async (id: string, updateUsersDto: UpdateUserDto) => {
    return this.usersRepository.save({ id, ...updateUsersDto });
  }

  removeUser = async (id: string) => {
    await this.usersRepository.findOneOrFail({ where: { id } });
    return this.usersRepository.softDelete({ id });
  }
}

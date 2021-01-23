import { Event } from './event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Injectable} from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  createEvent = async (createEventDto: CreateEventDto) => {
    const createObject = { userId: createEventDto.user.id, consents: createEventDto.consents, createdAt: createEventDto.createdAt };
    return await this.eventRepository.save(createObject);
  }

  findEvent = async (uid: string) => {
    return this.eventRepository.findOneOrFail({ where: { uid }, relations: ['user'] });
  }

  listAllEvents = async (query: any, offset, limit, sort) => {
    return this.eventRepository.findAndCount({where: query, skip: offset, take: limit, order: sort, relations: ['user']});
  }
}

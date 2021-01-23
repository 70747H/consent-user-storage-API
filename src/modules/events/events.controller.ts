import {
  Body, ClassSerializerInterceptor,
  Controller,
  Get, HttpException, HttpStatus, Inject, Logger,
  Param,
  Post,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {EventsService} from './events.service';
import {CreateEventDto} from './dto/create-event.dto';
import {PaginationPipe} from '../../pipes/pagination.pipe';
import { TransformResponseInterceptor } from '../../interceptors/transform-response.interceptor';
import { Event } from './event.entity';
import { EventDto } from './dto/event.dto';
import { UsersService } from '../users/users.service';
import { UserConsentsService } from '../user-consents/user-consents.service';
import { ConsentsService } from '../consents/consents.service';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { ApiBody } from '@nestjs/swagger';

@Controller('events')
@UseInterceptors(TransformResponseInterceptor)
export class EventsController {
  constructor(
    private eventsService: EventsService,
    private consentsService: ConsentsService,
    private usersService: UsersService,
    private userConsentsService: UserConsentsService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  // @ApiBody({ type: CreateEventDto })
  async create(@Body(new ValidationPipe({ transform: true })) createEventDto: CreateEventDto): Promise<Event> {
    const { user, consents } = createEventDto;
    const foundUser = await this.usersService.findUser(user.id);
    if (!foundUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    await consents.map(async (consent) => {
      const foundConsent = await this.consentsService.findConsent({ name: consent.id });
      const foundUserConsent = await this.userConsentsService.findUserConsent({ userId: foundUser.id, consentId: foundConsent.id });
      if (!foundUserConsent) {
        await this.userConsentsService.createUserConsent({ userId: foundUser.id, consentId: foundConsent.id, enabled: consent.enabled });
      } else {
        await this.userConsentsService.updateUserConsent(foundConsent.id, { enabled: consent.enabled });
      }
    });
    createEventDto.user.id = foundUser.id;
    return this.eventsService.createEvent(createEventDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiImplicitQuery({ name: 'page', required: false})
  @ApiImplicitQuery({ name: 'search', required: false})
  @ApiImplicitQuery({ name: 'sortBy', required: false})
  @ApiImplicitQuery({ name: 'sortValue', required: false})
  async findAll(
    @Query('page', PaginationPipe) pagination,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
    @Query('sortValue') sortValue: string,
  ): Promise<{ rows: EventDto[], count: number, limit: number, currentPage: number }> {
    const query: any = {};

    let sortObj: any = {
      id: 'ASC',
    };

    if (sortBy && sortValue) {
      sortObj = {};
      sortObj[sortBy] = sortValue;
    }

    const [rows, count] = await this.eventsService.listAllEvents(query, pagination.offset, pagination.limit, sortObj);
    return {
      rows: rows.map(event => new EventDto(event)),
      count,
      limit: pagination.limit,
      currentPage: pagination.pageNo,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Event> {
    return this.eventsService.findEvent(id);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import {EventsController} from './events.controller';
import { EventRepository } from './event.repository';
import { ConsentsModule } from '../consents/consents.module';
import { UsersModule } from '../users/users.module';
import { UserConsentsModule } from '../user-consents/user-consents.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventRepository]),
    ConsentsModule,
    UsersModule,
    UserConsentsModule,
  ],
  providers: [EventsService],
  controllers: [EventsController],
})
export class EventsModule {}

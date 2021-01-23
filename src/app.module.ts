import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ConsentsModule } from './modules/consents/consents.module';
import { UserConsentsModule } from './modules/user-consents/user-consents.module';
import { EventsModule } from './modules/events/events.module';
import ConfigModule from './config/config.module';
import ConfigService from './config/config.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.getTypeORMConfig(),
      inject: [ConfigService],
    }),
    UsersModule,
    ConsentsModule,
    UserConsentsModule,
    EventsModule,
  ],
})
export class AppModule {}

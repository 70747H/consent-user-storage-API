import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsentsService } from './consents.service';
import { ConsentRepository } from './consent.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConsentRepository]),
  ],
  providers: [ConsentsService],
  exports: [ConsentsService],
})
export class ConsentsModule {}

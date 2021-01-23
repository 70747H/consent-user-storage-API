import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserConsentsService } from './user-consents.service';
import { UserConsentRepository } from './user-consents.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserConsentRepository])],
  providers: [UserConsentsService],
  exports: [UserConsentsService],
})
export class UserConsentsModule {}

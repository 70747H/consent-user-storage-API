import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user.entity';

class Consent {
  constructor(userConsent) {
    this.id = userConsent.consent.name;
    this.enabled = userConsent.enabled;
  }
  id: number;
  enabled: boolean;
}

export class UserDto {

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.consents = user.consents.map(userConsent => new Consent(userConsent));
  }

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly id: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly consents: Consent[] = [];
}

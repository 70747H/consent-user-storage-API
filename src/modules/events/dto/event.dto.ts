import {
  ArrayNotEmpty,
  IsArray,
  IsDefined,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class User {
  constructor(user) {
    this.id = user.id;
  }
  id: number;
}

class Consent {
  constructor(consent) {
    this.id = consent.id;
    this.enabled = consent.enabled;
  }
  id: string;
  enabled: boolean;
}

export class EventDto {
  constructor(event) {
    this.user = new User(event.user);
    this.consents = event.consents.map(consent => new Consent(consent));
  }

  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => User)
  readonly user;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => Consent)
  readonly consents;
}

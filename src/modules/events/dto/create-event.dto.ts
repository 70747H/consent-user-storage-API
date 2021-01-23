import {
  ArrayNotEmpty,
  IsArray,
  IsDefined, IsISO8601,
  IsNotEmptyObject,
  IsObject, IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class SubUser {
  @ApiProperty()
  id: string;
}

export class SubConsent {
  @ApiProperty()
  id: string;

  @ApiProperty()
  enabled: boolean;
}

export class CreateEventDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => SubUser)
  readonly user: SubUser;

  @ApiProperty()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @Type(() => SubConsent)
  readonly consents: SubConsent[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsISO8601()
  readonly createdAt: string;
}

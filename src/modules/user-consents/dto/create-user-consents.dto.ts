import { IsNumber, IsString } from 'class-validator';

export class CreateUserConsentsDto {
  @IsNumber()
  readonly userId: string;

  @IsNumber()
  readonly consentId: string;

  @IsString()
  readonly enabled: boolean;
}

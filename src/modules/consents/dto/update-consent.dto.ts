import { IsString } from 'class-validator';

export class UpdateConsentDto {
  @IsString()
  readonly name: string;
}

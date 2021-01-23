import { IsString } from 'class-validator';

export class UpdateUserConsentsDto {
  @IsString()
  readonly enabled: boolean;
}

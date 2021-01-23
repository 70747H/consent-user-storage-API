import { IsString } from 'class-validator';

export class CreateConsentsDto {
  @IsString()
  readonly name: string;
}

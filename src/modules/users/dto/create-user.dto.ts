import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}

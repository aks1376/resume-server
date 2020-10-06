import { IsNotEmpty, MinLength, MaxLength, IsString, } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {


  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  avatar: string;
}
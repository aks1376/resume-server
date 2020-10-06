import { IsNotEmpty, MinLength, MaxLength, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMessageDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  message: string;
}
import { IsNotEmpty, IsString, MinLength, MaxLength, IsNumber, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateSkillDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  @IsNotEmpty()
  rate: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  descriptions: string[];
}
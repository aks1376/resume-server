import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProjectDto {

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  creators: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  technologies: string[];

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;
}
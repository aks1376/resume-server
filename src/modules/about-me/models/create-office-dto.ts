import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOfficeDto {

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty()
  endDate: string;

}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateCreatorDto {
  
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
  @ApiProperty()
  position: string;
  @ApiProperty()
  startDate: string;
  @ApiProperty()
  endDate: string; 
}
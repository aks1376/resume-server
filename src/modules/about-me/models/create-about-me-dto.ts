import { ApiProperty } from "@nestjs/swagger";

export class CreateAboutMeDto {

  @ApiProperty()
  description: string;
}
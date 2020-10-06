import { ApiProperty } from "@nestjs/swagger";

export class UpdateSkillDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  rate: string;

  @ApiProperty()
  group: string;

  @ApiProperty()
  descriptions: string[];
}
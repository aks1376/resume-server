import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  website: string;

  @ApiProperty()
  avatar: string;
}
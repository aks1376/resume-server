import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./../../../modules/users/models/user-dto";

export class CreatorDto {

  @ApiProperty()
  _id: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  user: UserDto;

  @ApiProperty()
  position: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

}
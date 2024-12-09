import { UserDto } from "@/dtos/user.dto";

export interface LoggedInUserDto {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}

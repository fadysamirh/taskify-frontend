import { LoginDto } from "@/dtos/authentication/login.dto";
import { RegisterDto } from "@/dtos/authentication/register.dto";
import { LoggedInUserDto } from "@/dtos/authentication/logged-in-user.dto";
import { privateApi, publicApi } from "@/api/instances/api.instance";
import { BaseResponseDto } from "@/dtos/base-response.dto";
import { UserDto } from "@/dtos/user.dto";
import { AxiosResponse } from "axios";

export class AuthenticationApi {
  public static async login(
    body: LoginDto,
  ): Promise<AxiosResponse<BaseResponseDto<LoggedInUserDto>>> {
    return await publicApi().post<BaseResponseDto<LoggedInUserDto>>(
      "/authentication/login",
      body,
    );
  }

  public static async register(
    body: RegisterDto,
  ): Promise<AxiosResponse<BaseResponseDto<void>>> {
    return await publicApi().post("/authentication/register", body);
  }

  public static async verifyToken(
    token: string,
  ): Promise<AxiosResponse<BaseResponseDto<UserDto>>> {
    return await privateApi().post<BaseResponseDto<UserDto>>(
      "/authentication/verify-token",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  }
}

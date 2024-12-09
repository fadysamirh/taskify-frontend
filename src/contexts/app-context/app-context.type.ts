import { UserDto } from "@/dtos/user.dto";
import { LoginDto } from "@/dtos/authentication/login.dto";
import { RegisterDto } from "@/dtos/authentication/register.dto";

export type AppContextType = {
  user: UserDto | undefined;
  accessToken: string | null | undefined;
  login: (loginDto: LoginDto) => Promise<void>;
  logout: () => void;
  register: (registerDto: RegisterDto) => Promise<void>;
  loading: boolean;
};

export const AppContextDefaultValue: AppContextType = {
  user: undefined,
  accessToken: undefined,
  login: async () => {},
  logout: () => {},
  register: async () => {},
  loading: false,
};

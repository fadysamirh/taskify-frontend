"use client";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { UserDto } from "@/dtos/user.dto";
import {
  AppContextDefaultValue,
  AppContextType,
} from "@/contexts/app-context/app-context.type";
import { AuthenticationApi } from "@/api/authentication.api";
import { useRouter } from "next/navigation";
import { LoginDto } from "@/dtos/authentication/login.dto";
import { RegisterDto } from "@/dtos/authentication/register.dto";
import { usePathname } from "next/navigation";
import { setToken } from "@/api/instances/api.instance";
import { Notify } from "@/components/common/app-notifications/notifications";

const AppContext = createContext<AppContextType>(AppContextDefaultValue);
export const useAppContext = () => useContext(AppContext);

type Props = {
  children: ReactNode;
};

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserDto | undefined>();
  const [accessToken, setAccessToken] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setLoading(true);
        try {
          const response = await AuthenticationApi.verifyToken(token);
          setUser(response.data.data);
          setAccessToken(token);
          if (pathname === "/login") {
            router.replace("/");
          }
        } catch (e: any) {
          router.push("login");
        } finally {
          setLoading(false);
        }
      } else {
        router.push("login");
      }
    };

    initializeAuth();
  }, []);

  const login = async (loginDto: LoginDto) => {
    setLoading(true);
    try {
      const response = await AuthenticationApi.login(loginDto);

      Notify.success(response.data.message);
      const { accessToken, user } = response.data.data!;

      localStorage.setItem("accessToken", accessToken);

      setAccessToken(accessToken);
      setUser(user);
      setToken(accessToken);

      router.push("/");
    } catch (e: any) {
      if (e.response) {
        Notify.error(
          (e.response.data ? e.response.data.message : e.response.message) ??
            "Something went wrong",
        );
      } else {
        Notify.error(e.message ?? "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (registerDto: RegisterDto) => {
    setLoading(true);
    try {
      const response = await AuthenticationApi.register(registerDto);
      Notify.success(response.data.message);
      router.push("login");
    } catch (e: any) {
      if (e.response) {
        Notify.error(
          (e.response.data ? e.response.data.message : e.response.message) ??
            "Something went wrong",
        );
      } else {
        Notify.error(e.message ?? "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken(undefined);
    setUser(undefined);
    router.push("login");
  };

  const data: AppContextType = useMemo(() => {
    return { user, accessToken, logout, login, loading, register };
  }, [user, accessToken]);

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

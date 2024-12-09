import { Helpers } from "@/utils/helpers";

enum LOCAL_STORAGE_KEYS {
  REDIRECT_TO = "rt",
  ACCESS_TOKEN = "at",
}

export class LocalStorageUtils {
  public static getAndRemoveRedirectTo = (): string | undefined => {
    if (!Helpers.isSsr()) {
      const redirectTo =
        localStorage.getItem(LOCAL_STORAGE_KEYS.REDIRECT_TO) ?? undefined;
      if (redirectTo) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.REDIRECT_TO);
        return redirectTo;
      }
    }
    return undefined;
  };

  public static setRedirectTo = (
    redirectTo: string | string[] | undefined,
  ): void => {
    if (!Helpers.isSsr() && redirectTo && typeof redirectTo === "string") {
      localStorage.setItem(LOCAL_STORAGE_KEYS.REDIRECT_TO, redirectTo);
    }
  };
}

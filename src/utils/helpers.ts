export class Helpers {
  public static isSsr = () => {
    return typeof window === "undefined";
  };
}

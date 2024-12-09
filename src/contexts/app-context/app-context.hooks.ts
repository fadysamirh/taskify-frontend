import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useAppContext } from "@/contexts/app-context/app-context";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width?: number;
    height?: number;
  }>({ width: undefined, height: undefined });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Don't forget to remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export const useIsMobile = () => {
  const theme = useTheme();
  const { isSsrMobile } = useAppContext();
  const { width: windowWidth } = useWindowSize();
  const isBrowserMobile =
    !!windowWidth && windowWidth <= theme.breakpoints.values.lg;
  return isSsrMobile || isBrowserMobile;
};

import { mediaQueries } from "@/styles/theme/media-queries";
import { Theme as ITheme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { CSSProperties } from "@mui/material/styles/createTypography";
import { Outfit, Public_Sans } from "next/font/google";
declare module "@mui/material/styles/createPalette" {
  interface Palette {
    neutral: Palette["primary"];
    shade: Palette["primary"];
  }
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    shade?: PaletteOptions["primary"];
  }
  interface PaletteColor {
    _25: string;
    _30: string;
    _50: string;
    _100: string;
    _200: string;
    _300: string;
    _400: string;
    _500: string;
    _600: string;
    _700: string;
    _800: string;
    _900: string;
  }
  interface SimplePaletteColorOptions {
    _25?: string;
    _30?: string;
    _50?: string;
    _100?: string;
    _200?: string;
    _300?: string;
    _400?: string;
    _500?: string;
    _600?: string;
    _700?: string;
    _800?: string;
    _900?: string;
  }
  interface TypeText {
    light: string;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body1SemiBold: CSSProperties;
    body1Bold: CSSProperties;
    body2: CSSProperties;
    body2SemiBold: CSSProperties;
    body2Bold: CSSProperties;
    label: CSSProperties;
  }

  interface TypographyVariantsOptions {
    body1SemiBold?: React.CSSProperties;
    body1Bold?: React.CSSProperties;
    body2: React.CSSProperties;
    body2SemiBold: React.CSSProperties;
    body2Bold: React.CSSProperties;
    label?: React.CSSProperties;
  }

  interface ButtonVariants {
    inlineText: React.CSSProperties;
  }

  interface ButtonVariantsOptions {
    inlineText?: React.CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    shade: true;
  }
  interface ButtonPropsVariantOverrides {
    inlineText: true;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body1SemiBold: true;
    body1Bold: true;
    body2: true;
    body2SemiBold: true;
    body2Bold: true;
    label: true;
  }
}
export const publicSans = Public_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const outfit = Outfit({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const getCssProps = () => {
  let animationDirection = "decimal";
  let orderedListStyleType = "normal";

  return {
    animationDirection,
    orderedListStyleType,
  };
};

export const Theme = (): ITheme => {
  const cssProps = getCssProps();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#fab55a",
        _25: "#f2f3f5",
        _30: "#d9dbdf",
        _50: "#e8eaf0",
        _100: "#c1c7d0",
        _200: "#99a3b0",
        _300: "#718090",
        _400: "#4a5c71",
        _500: "#223851",
        _600: "#1d3048",
        _700: "#18283e",
        _800: "#132035",
        _900: "#0e182b",
      },
      secondary: {
        main: "#141925",
        _50: "#e8eaf0",
        _100: "#c1c7d0",
        _200: "#99a3b0",
        _300: "#718090",
        _400: "#4a5c71",
        _500: "#223851",
        _600: "#1d3048",
        _700: "#18283e",
        _800: "#132035",
        _900: "#0e182b",
      },
      neutral: {
        main: "#697586",
        _25: "#f7f7f7",
        _30: "#D1D5DB",
        _50: "#f0f1f3",
        _100: "#d1d4d9",
        _200: "#bac0c7",
        _300: "#9ba3ae",
        _400: "#87919e",
        _500: "#697586",
        _600: "#606a7a",
        _700: "#4b535f",
        _800: "#3a404a",
        _900: "#2c3138",
      },
      shade: {
        main: "#000000",
        light: "#ffffff",
        dark: "#000000",
      },
      success: {
        main: "#12b76a",
      },
      error: {
        main: "#f04438",
      },
      warning: {
        main: "#f79009",
      },
      text: {
        primary: "#003055",
        secondary: "#00907A",
        disabled: "#98b4d3",
      },
    },
  });

  theme.typography.h1 = {
    ...theme.typography.h1,
    fontWeight: 600,
    fontSize: "60px",
    lineHeight: "65px",
    fontFamily: outfit.style.fontFamily,
    [mediaQueries.small(theme)]: {
      fontSize: "36px",
      lineHeight: "36px",
    },
  };

  theme.typography.h2 = {
    ...theme.typography.h2,
    fontWeight: 600,
    fontSize: "40px",
    lineHeight: "unset",
    fontFamily: outfit.style.fontFamily,
    [mediaQueries.small(theme)]: {
      fontSize: "24px",
      lineHeight: "28px",
    },
  };

  theme.typography.h3 = {
    ...theme.typography.h3,
    fontWeight: 600,
    fontSize: "36px",
    lineHeight: "unset",
    fontFamily: outfit.style.fontFamily,
    [mediaQueries.small(theme)]: {
      fontSize: "30px",
      lineHeight: "36px",
    },
  };

  theme.typography.body1 = {
    ...theme.typography.body1,
    fontWeight: 400,
    fontSize: "18px",
    [mediaQueries.small(theme)]: {
      fontSize: "14px",
    },
  };

  theme.typography.body1SemiBold = {
    ...theme.typography.body1,
    fontWeight: 600,
    fontSize: "18px",
  };

  theme.typography.body1Bold = {
    ...theme.typography.body1,
    fontWeight: 700,

    [mediaQueries.small(theme)]: {
      lineHeight: "21px",
    },
  };

  theme.typography.body2 = {
    ...theme.typography.body1,
    fontWeight: 400,
    fontSize: "14px",
    [mediaQueries.small(theme)]: {
      fontSize: "12px",
    },
  };

  theme.typography.body2SemiBold = {
    ...theme.typography.body1,
    fontWeight: 600,
    fontSize: "14px",
    [mediaQueries.small(theme)]: {
      fontSize: "0.85rem",
    },
  };

  theme.typography.body2Bold = {
    ...theme.typography.body1,
    fontWeight: 700,
    fontSize: "14px",
    [mediaQueries.small(theme)]: {
      fontSize: "12px",
    },
  };

  theme.typography.label = {
    ...theme.typography.subtitle1,
    fontWeight: 600,
    fontSize: "12px",
  };

  theme.components = {
    ...theme.components,
    MuiTypography: {
      styleOverrides: {
        root: {
          color: theme.palette.secondary.main,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "inlineText" },
          style: {
            height: "unset",
            padding: 0,
            minWidth: "unset",
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: "transparent",
              color: theme.palette.primary._400,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          boxShadow: "none",
          textTransform: "none",
          height: "48px",
        },
        sizeLarge: {
          fontWeight: 600,
          fontSize: "18px",
          padding: "15px 40px 16px 40px",
          borderRadius: "12px",
        },
        sizeMedium: {
          fontWeight: 600,
          fontSize: "16px",
          padding: "14px 20px 14px 20px",
          borderRadius: "8px",
        },
        sizeSmall: {
          fontWeight: 500,
          fontSize: "14px",
          padding: "12px 16px 12px 16px",
          borderRadius: "8px",
        },
        contained: {
          color: theme.palette.shade.light,
          "&.Mui-disabled": {
            opacity: 0.4,
            backgroundColor: theme.palette.primary.main,
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: theme.palette.primary._25,
        },
        indeterminate: {
          animationDirection: cssProps.animationDirection,
        },
        circleIndeterminate: {
          animationDirection: cssProps.animationDirection,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          "&:focus": {
            backgroundColor: "None",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.shade.light,
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "15px",
          padding: "18px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.neutral,
              "&:hover": {
                borderColor: theme.palette.primary.main,
              },
            },
          },
          "& .MuiFilledInput-underline:before": {
            borderBottom: "none",
          },
          "& .MuiFilledInput-underline:after": {
            borderBottom: "none",
          },
          "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: "none",
          },
          "& .MuiInputBase-input": {
            display: "flex",
            alignItems: "center",
            height: "100%",
            padding: "14px",
            "@media (max-width: 768px)": {
              "& .MuiOutlinedInput-root": {
                padding: "25",
              },
            },
          },
          "& .MuiFilledInput-root": {
            borderRadius: "8px",
            fontSize: "12px",
            overflow: "hidden",
            "@media (max-width: 768px)": {
              fontSize: "16px",
              borderRadius: "12px",
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: "14px",
          fontStyle: "normal",
          color: theme.palette.secondary.main,
          marginBottom: "5px",
          "@media (max-width: 768px)": {
            fontSize: "16px",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "12px",
          fontWeight: 400,
          "@media (max-width: 768px)": {
            fontSize: "16px",
          },
        },
      },
    },
  };

  return theme;
};

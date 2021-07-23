import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import {
  ThemeOptions, createTheme
} from "@material-ui/core";


declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

const mainColor = {
  "600": "#004E89",
  "500": "#1A659E",
};

const secondaryColor = {
  "600": "#FF6B35",
  "500": "#F7C59F",
};

const neutralColor = {
  "800": "#0A0D12",
  "700": "#0E151B",
  "600": "#1E2327",
  "500": "#272C30",
  "400": "#3B3C44",
  "300": "#4F4D50",
  "200": "#5D6267",
};

const darkPalette: PaletteOptions = {
  type: "dark",
  primary: {
    dark: mainColor["600"],
    main: mainColor["500"],
    contrastText: "#fff",
  },
  secondary: {
    dark: secondaryColor["600"],
    main: secondaryColor["500"],
    contrastText: "#fff",
  },
  neutral: {
    "800": neutralColor["800"],
    "700": neutralColor["700"],
    "600": neutralColor["600"],
    "500": neutralColor["500"],
    "400": neutralColor["400"],
    "300": neutralColor["300"],
    "200": neutralColor["200"],
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: darkPalette,
  typography: {
    fontFamily: ['"Work Sans"', "sans-serif"].join(","),
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: neutralColor["600"],
        },
      },
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: neutralColor["500"],
      },
    },
  },
};

const darkTheme = createTheme(darkThemeOptions);

const theme = darkTheme;

export default theme;
import { PaletteOptions } from "@material-ui/core/styles/createPalette";
import { ThemeOptions, createTheme, Theme } from "@material-ui/core";
// import teal from "@material-ui/core/colors/teal";
// import green from "@material-ui/core/colors/green";
// import amber from "@material-ui/core/colors/amber";
// import deepOrange from "@material-ui/core/colors/deepOrange";
// import blueGrey from "@material-ui/core/colors/blueGrey";
// import cyan from "@material-ui/core/colors/cyan";
import gray from "@material-ui/core/colors/grey";

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    neutral: Palette["primary"];
  }
  interface PaletteOptions {
    neutral: PaletteOptions["primary"];
  }
}

export default class ThemeService {
  private static _instance: ThemeService;
  private static get instance(): ThemeService {
    if (!ThemeService._instance) {
      ThemeService._instance = new ThemeService();
    }
    return ThemeService._instance;
  }

  private constructor() {}

  public static createTheme(): Theme {
    const style = getComputedStyle(document.body);

    const primaryColor = {
      50: style.getPropertyValue("--color-primary-50").trim(),
      100: style.getPropertyValue("--color-primary-100").trim(),
      200: style.getPropertyValue("--color-primary-200").trim(),
      300: style.getPropertyValue("--color-primary-300").trim(),
      400: style.getPropertyValue("--color-primary-400").trim(),
      500: style.getPropertyValue("--color-primary-500").trim(),
      600: style.getPropertyValue("--color-primary-600").trim(),
      700: style.getPropertyValue("--color-primary-700").trim(),
      800: style.getPropertyValue("--color-primary-800").trim(),
      900: style.getPropertyValue("--color-primary-900").trim(),
      A100: style.getPropertyValue("--color-on-primary-100").trim(),
      A200: style.getPropertyValue("--color-on-primary-200").trim(),
      A400: style.getPropertyValue("--color-on-primary-400").trim(),
      A700: style.getPropertyValue("--color-on-primary-700").trim(),
    };

    const secondaryColor = {
      50: style.getPropertyValue("--color-secondary-50").trim(),
      100: style.getPropertyValue("--color-secondary-100").trim(),
      200: style.getPropertyValue("--color-secondary-200").trim(),
      300: style.getPropertyValue("--color-secondary-300").trim(),
      400: style.getPropertyValue("--color-secondary-400").trim(),
      500: style.getPropertyValue("--color-secondary-500").trim(),
      600: style.getPropertyValue("--color-secondary-600").trim(),
      700: style.getPropertyValue("--color-secondary-700").trim(),
      800: style.getPropertyValue("--color-secondary-800").trim(),
      900: style.getPropertyValue("--color-secondary-900").trim(),
      A100: style.getPropertyValue("--color-on-secondary-100").trim(),
      A200: style.getPropertyValue("--color-on-secondary-200").trim(),
      A400: style.getPropertyValue("--color-on-secondary-400").trim(),
      A700: style.getPropertyValue("--color-on-secondary-700").trim(),
    };

    const successColor = {
      50: style.getPropertyValue("--color-success-50").trim(),
      100: style.getPropertyValue("--color-success-100").trim(),
      200: style.getPropertyValue("--color-success-200").trim(),
      300: style.getPropertyValue("--color-success-300").trim(),
      400: style.getPropertyValue("--color-success-400").trim(),
      500: style.getPropertyValue("--color-success-500").trim(),
      600: style.getPropertyValue("--color-success-600").trim(),
      700: style.getPropertyValue("--color-success-700").trim(),
      800: style.getPropertyValue("--color-success-800").trim(),
      900: style.getPropertyValue("--color-success-900").trim(),
      A100: style.getPropertyValue("--color-on-success-100").trim(),
      A200: style.getPropertyValue("--color-on-success-200").trim(),
      A400: style.getPropertyValue("--color-on-success-400").trim(),
      A700: style.getPropertyValue("--color-on-success-700").trim(),
    };

    const warningColor = {
      50: style.getPropertyValue("--color-warning-50").trim(),
      100: style.getPropertyValue("--color-warning-100").trim(),
      200: style.getPropertyValue("--color-warning-200").trim(),
      300: style.getPropertyValue("--color-warning-300").trim(),
      400: style.getPropertyValue("--color-warning-400").trim(),
      500: style.getPropertyValue("--color-warning-500").trim(),
      600: style.getPropertyValue("--color-warning-600").trim(),
      700: style.getPropertyValue("--color-warning-700").trim(),
      800: style.getPropertyValue("--color-warning-800").trim(),
      900: style.getPropertyValue("--color-warning-900").trim(),
      A100: style.getPropertyValue("--color-on-warning-100").trim(),
      A200: style.getPropertyValue("--color-on-warning-200").trim(),
      A400: style.getPropertyValue("--color-on-warning-400").trim(),
      A700: style.getPropertyValue("--color-on-warning-700").trim(),
    };

    const errorColor = {
      50: style.getPropertyValue("--color-danger-50").trim(),
      100: style.getPropertyValue("--color-danger-100").trim(),
      200: style.getPropertyValue("--color-danger-200").trim(),
      300: style.getPropertyValue("--color-danger-300").trim(),
      400: style.getPropertyValue("--color-danger-400").trim(),
      500: style.getPropertyValue("--color-danger-500").trim(),
      600: style.getPropertyValue("--color-danger-600").trim(),
      700: style.getPropertyValue("--color-danger-700").trim(),
      800: style.getPropertyValue("--color-danger-800").trim(),
      900: style.getPropertyValue("--color-danger-900").trim(),
      A100: style.getPropertyValue("--color-on-danger-100").trim(),
      A200: style.getPropertyValue("--color-on-danger-200").trim(),
      A400: style.getPropertyValue("--color-on-danger-400").trim(),
      A700: style.getPropertyValue("--color-on-danger-700").trim(),
    };

    const infoColor = gray;

    const neutralColor = gray;

    // TODO : Verify if body.hasClass("light-theme") to set theme accordingly

    const palette: PaletteOptions = {
      type: "dark",
      primary: primaryColor,
      secondary: secondaryColor,
      success: successColor,
      warning: warningColor,
      error: errorColor,
      info: infoColor,
      neutral: neutralColor,
    };

    const themeOptions: ThemeOptions = {
      palette: palette,
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

    const theme = createTheme(themeOptions);

    return theme;
  }
}

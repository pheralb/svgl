import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import components from "./components";

const theme = extendTheme(
  {
    components,
  },
  {
    config: {
      initialColorMode: "light",
      useSystemColorMode: false,
    },
    colors: {
      dark: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#e6e6e6",
        300: "#d6d6d6",
        400: "#a5a5a5",
        500: "#767676",
        600: "#575757",
        700: "#434343",
        800: "#292929",
        900: "#000000",
      },
      lightDark: {
        900: "#16161a",
      },
      light: {
        100: "#f9f9f9",
      },
    },
    fonts: {
      body: "Poppins-Regular, sans-serif",
      heading: "Poppins-Regular, sans-serif",
    },
    styles: {
      global: (props) => ({
        "html, body": {
          height: "100%",
          maxHeight: "100vh",
          backgroundColor: mode("light.100", "lightDark.900")(props),
        },
      }),
      borderColor: "red",
    },
  }
);

export default theme;

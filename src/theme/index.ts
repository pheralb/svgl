import { ChakraProps, extendTheme } from "@chakra-ui/react";
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
      bg: {
        light: "#F2F2F2",
        dark: "#050505",
      },
      full: {
        light: "#ffffff",
        dark: "#000000",
      },
      brand: {
        purple: "#4343E5"
      }
    },
    fonts: {
      body: "Inter-Regular, sans-serif",
      heading: "Inter-Semibold, sans-serif",
    },
    styles: {
      global: (props: ChakraProps) => ({
        "html, body": {
          height: "100%",
          maxHeight: "100vh",
          backgroundColor: mode("bg.light", "bg.dark")(props),
          fontSize: "14px",
        },
      }),
    },
  }
);

export default theme;

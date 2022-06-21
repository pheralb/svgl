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
        purple: "#4343E5",
      },
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
          bgGradient: mode(
            "radial(circle at 1px 1px, #C5C5C5 1px, bg.light 0)",
            "radial(circle at 1px 1px, #212121 1px, bg.dark 0)"
          )(props),
          backgroundSize: "40px 40px",
          fontSize: "14px",
        },
      }),
    },
  }
);

export default theme;

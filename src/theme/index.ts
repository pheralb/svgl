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
        light: "#f2f2f3",
        dark: "#242424",
      },
      full: {
        light: "#ffffff",
        dark: "#000000",
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
          background: mode(
            "radial-gradient(circle at 1px 1px, #E7E7E7 1px, #f2f2f3 0)",
            "radial-gradient(circle at 1px 1px, #303030 1px, #242424 0)"
          )(props),
          backgroundSize: "40px 40px",
          fontSize: "14px",
        },
      }),
      borderColor: "red",
    },
  }
);

export default theme;

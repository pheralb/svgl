import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        fontSize: "18px",
        fontFamily: "Inter-Regular",
        fontWeight: "light",
        color: mode("#2b2c34", "whiteAlpha.900")(props),
        bg: mode("#fbfbfb", "#16161a")(props),
      },
    }),
  }
});

export default theme;
import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "styles/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icons/icon-512x512.png"></link>
          <meta name="theme-color" content="#36558F" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

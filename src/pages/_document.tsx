import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import theme from "@/theme";

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="application-name" content="svgl" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="apple-mobile-web-app-title" content="svgl" />
          <meta
            name="description"
            content="A beautiful library with SVG logos."
          />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta
            name="msapplication-config"
            content="/icons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#4343E5" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#4343E5" />

          <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/icons/apple-touch-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/icons/apple-touch-icon-114x114.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/logo.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/logo.png"
          />
          <link rel="shortcut icon" href="/icons/icon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="mask-icon" href="/images/svgl.svg" color="#4343e5" />

          <meta name='twitter:card' content='summary' />
          <meta name='twitter:url' content='https://svgl.vercel.app/' />
          <meta name='twitter:title' content='svgl' />
          <meta name='twitter:description' content='A beautiful library with SVG logos.' />
          <meta name='twitter:image' content='https://svgl.vercel.app/images/banner.png' />
          <meta name='twitter:creator' content='@pheralb_' />

          <meta property='og:type' content='website' />
          <meta property='og:title' content='svgl' />
          <meta property='og:description' content='A beautiful library with SVG logos.' />
          <meta property='og:site_name' content='svgl' />
          <meta property='og:url' content='https://svgl.vercel.app/' />
          <meta property='og:image' content='https://svgl.vercel.app/icons/apple-touch-icon-180x180.png' />
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

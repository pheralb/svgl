// 🖤 Next Head ->
import Head from "next/head";

// 🌿 Chakra UI ->
import { ChakraProvider, Container } from "@chakra-ui/react";

// 📦 Components ->
import Header from "components/header";
import Footer from "components/footer";

// 💙 Global CSS ->
import "styles/globals.css";

// 🎨 Theme ->
import theme from "styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SVGParty - Beautiful SVG vector logos</title>
        <meta name="description" content="SVGs for everyone, totally free" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="SVGParty - Beautiful SVG logos"
        />
        <meta property="og:url" content="https://svgparty.vercel.app/" />
        <meta
          property="og:description"
          content="Beautiful SVG logos. Free and open source."
        />
        <meta
          property="og:image"
          content="https://svgparty.vercel.app/images/banner.png"
        />
        <meta name="keywords" content="svg,vector,logo,logos,download" />
        <meta content="#16161a" name="theme-color" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <ChakraProvider theme={theme}>
        <Container maxW={{ base: "100%", md: "85%" }}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Container>
      </ChakraProvider>
    </>
  );
}

export default MyApp;

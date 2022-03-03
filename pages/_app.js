// 🖤 Next Head ->
import Head from "next/head";

// 🌿 Chakra UI ->
import { ChakraProvider, Container } from "@chakra-ui/react";

// 📦 Components ->
import Layout from "components/layout";
import Header from "components/header";
import Footer from "components/footer";

// 💙 Global CSS ->
import "styles/globals.css";

// 🎨 Theme ->
import theme from "styles/theme";

// 🐢 Animations ->
import Transitions from "animations/transitions";

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>SVGL - Beautiful SVG vector logos</title>
        <meta name="description" content="SVGs for everyone, totally free" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="SVGL - Beautiful SVG logos" />
        <meta property="og:url" content="https://svgl.vercel.app/" />
        <meta
          property="og:description"
          content="Beautiful SVG logos. Free and open source."
        />
        <meta property="og:image" content="/images/logo.png" />
        <meta name="keywords" content="svg,vector,logo,logos,download" />
        <meta content="#16161a" name="theme-color" />
        <link rel="icon" href="/icons/icon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Header />
        <Layout>
          <Transitions key={router.route}>
            <Component {...pageProps} />
          </Transitions>
        </Layout>
        <Footer />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

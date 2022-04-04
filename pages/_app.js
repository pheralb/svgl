// 🖤 Next Head ->
import Head from "next/head";

// 🌿 Chakra UI ->
import { ChakraProvider, Container, useColorModeValue } from "@chakra-ui/react";

// ➡️ Nextjs Progressbar ->
import NextNProgress from "nextjs-progressbar";

// 📦 Components ->
import Sidebar from "components/sidebar";
import Layout from "components/layout";
import Footer from "components/sidebar/by";

// 💙 Global CSS ->
import "styles/globals.css";

// 🎨 Theme ->
import theme from "styles/theme";

// 🐢 Animations ->
import Transitions from "animations/transitions";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps, router }) {
  const progress = useColorModeValue("#7B7B7B", "#D4D4D4");
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SVGL - Beautiful SVG vector logos</title>
        <meta property="og:title" content="SVGL - Beautiful SVG vector logos" />
        <meta
          property="og:description"
          content="Beautiful SVG logos. Free and open source."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://svgl.vercel.app/" />
        <meta
          property="og:image"
          content="https://svgl.vercel.app/images/banner.png"
        />
        <meta name="twitter:site" content="@pheralb_" />
        <meta
          property="twitter:title"
          content="SVGL - Beautiful SVG vector logos"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:creator" content="@pheralb" />
        <meta
          property="twitter:description"
          content="Beautiful SVG logos. Free and open source."
        />
        <meta
          name="twitter:image"
          content="https://svgl.vercel.app/images/banner.png"
        />

        <meta name="keywords" content="svg,vector,logo,logos,download" />
        <meta content="#16161a" name="theme-color" />
        <link rel="icon" href="/icons/icon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Sidebar>
          <NextNProgress color={progress}/>
          <Layout>
            <Transitions key={router.route}>
              <Component {...pageProps} />
            </Transitions>
          </Layout>
        </Sidebar>
      </ChakraProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default MyApp;

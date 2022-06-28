import type { AppProps } from "next/app";

// Chakra UI & custom styles ->
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import "@/styles/globals.css";

// Layout ->
import Layout from "@/layout";

// Nextjs Progressbar ->
import NextNProgress from "nextjs-progressbar";

// Framer ->
import { motion } from "framer-motion";

// SWR Config & services ->
import { SWRConfig } from "swr";
import { fetcher } from "@/services/fetcher";

// React Hot Toast ->
import { Toaster } from "react-hot-toast";
import { DefaultSeo } from "next-seo";
import nextSeoConfig from "next-seo.config";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />
      <NextNProgress
        color="#4343E5"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        showOnShallow={true}
      />
      <ChakraProvider theme={theme}>
        <SWRConfig value={{ fetcher }}>
          <Layout>
            <motion.div
              key={router.route}
              initial="initial"
              animate="animate"
              variants={{
                initial: {
                  opacity: 0,
                },
                animate: {
                  opacity: 1,
                },
              }}
            >
              <Component {...pageProps} />
            </motion.div>
          </Layout>
        </SWRConfig>
      </ChakraProvider>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}

export default MyApp;

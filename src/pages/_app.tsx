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

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#4343E5"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
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
    </>
  );
}

export default MyApp;

import type { AppProps } from "next/app";

// Chakra UI & custom styles ->
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import "@/styles/globals.css";

// Layout ->
import Layout from "@/layout";

// SWR Config & services ->
import { SWRConfig } from "swr";
import { fetcher } from "@/services/fetcher";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{ fetcher }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;

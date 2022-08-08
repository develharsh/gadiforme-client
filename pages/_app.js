import "../styles/globals.css";
import Layout from "../components/layout";
import { DataProvider } from "../store/globalstate";
import { ChakraProvider } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </DataProvider>
  );
}

export default MyApp;

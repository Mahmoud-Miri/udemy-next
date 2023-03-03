import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/lib/theme/theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import SidebarWithHeader from "@/lib/components/SidebarWithHeader";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <SidebarWithHeader>
          <Component {...pageProps} />
        </SidebarWithHeader>
      </ChakraProvider>
    </UserProvider>
  );
};

export default App;

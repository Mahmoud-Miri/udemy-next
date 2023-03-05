import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/lib/theme/theme";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import SidebarWithHeader from "@/lib/components/SidebarWithHeader";
import i18n from "../lib/i18/i18n-init";
import { I18nextProvider } from "react-i18next";
import initDatadog from "@/lib/datadog/dd-init";

const App = ({ Component, pageProps }: AppProps) => {
  initDatadog();

  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <I18nextProvider i18n={i18n}>
          <SidebarWithHeader>
            <Component {...pageProps} />
          </SidebarWithHeader>
        </I18nextProvider>
      </ChakraProvider>
    </UserProvider>
  );
};

export default App;

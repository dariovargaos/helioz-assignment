import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthContextProvider } from "./context/AuthContext.tsx";

const queryClient = new QueryClient();

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#F5F5F5",
      },
    },
  },
  components: {
    Alert: {
      variants: {
        customSuccess: {
          container: {
            bg: "black",
            color: "white",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);

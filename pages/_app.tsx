import "../styles/globals.css";
import type { AppProps /*, AppContext */ } from "next/app";
import StoreProvider from '../store/provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    );
}

export default MyApp;

import type { AppProps } from "next/app";
import Layout from "~/components/layout/Layout";
import { EnvContext } from "~/stores/envContext";
import "~/styles/globals.css";

export default function App({
  Component,
  pageProps,
  apiUrl,
  basePath,
}: AppProps & { apiUrl: string; basePath: string }) {
  return (
    <EnvContext.Provider value={{ apiUrl: apiUrl, basePath: basePath }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </EnvContext.Provider>
  );
}

App.getInitialProps = async () => {
  return {
    apiUrl: global.process.env.API_URL,
    basePath: global.process.env.BASE_PATH,
  };
};

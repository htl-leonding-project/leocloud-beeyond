import React, { ReactNode } from "react";

import Head from "next/head";
import { Navbar } from "@components/layout/Navbar";
import { useEnvContext } from "@stores/envContext";

const Layout = ({ children }: { children: ReactNode }) => {
  const { basePath } = useEnvContext();

  return (
    <>
      <Head>
        <title>Beeyond</title>
        <link rel="icon" href={`${basePath}/favicon.ico`} />
      </Head>
      <main className="flex h-screen flex-col p-2">
        <div className={"p-2"}>
          <Navbar />
        </div>
        <div className="flex h-full overflow-hidden p-2">{children}</div>
      </main>
    </>
  );
};

export default Layout;

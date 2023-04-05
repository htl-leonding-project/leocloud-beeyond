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
      <main className="mx-2 flex h-screen flex-col">
        <Navbar></Navbar>
        <div className="mb-2 h-full">{children}</div>
      </main>
    </>
  );
};

export default Layout;

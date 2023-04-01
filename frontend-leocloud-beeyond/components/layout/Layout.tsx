import React, { ReactNode } from "react";

import Head from "next/head";
import { Navbar } from "@components/layout/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Beeyond</title>
        <link rel="icon" href={`${process.env.BASE_PATH}/favicon.ico`} />
      </Head>
      <main className="mx-2 flex h-screen flex-col">
        <Navbar></Navbar>
        <div className="mb-2 h-full">{children}</div>
      </main>
    </>
  );
};

export default Layout;

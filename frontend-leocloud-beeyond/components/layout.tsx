import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Beeyond</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col h-screen">
        <Navbar></Navbar>
        <div className="h-full mb-2 mx-2">{children}</div>
      </main>
    </>
  );
};

export default Layout;

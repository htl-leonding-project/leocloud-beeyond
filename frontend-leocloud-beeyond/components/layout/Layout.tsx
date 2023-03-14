import React, { ReactNode } from "react";
import Head from "next/head";
import { Navbar } from "@components/layout/Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Beeyond</title>
        <link rel="icon" href={`${process.env.BASE_PATH}/favicon.ico`} />
      </Head>
      <main className="flex flex-col h-screen mx-2">
        <Navbar></Navbar>
        <div className="h-full mb-2">{children}</div>
      </main>
    </>
  );
};

export default Layout;
